Meteor.subscribe("products");
// This code only runs on the client
Template.body.helpers({
  products: function () {
    if (Session.get("hideChecked")) {
      // If hide completed is checked, filter tasks
      return Products.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
    } else {
      // Otherwise, return all of the tasks
      return Products.find({}, {sort: {createdAt: -1}});
    }
    console.log("product.find working");
  },
  hideChecked: function () {
    return Session.get("hideChecked");
  },
  // productCount: function () {
  //   return Products.find({checked: {$ne: true}}).count();
  // },
  editMode: function(){
    return Session.equals('viewMode', 'edit');
  }
});

Template.body.events({
  "click .cancel": function () {
    var title = $("input[name~='title']").val("");
    var text =  $("textarea[name~='text']").val("");
    var price = $("input[name~='price']").val("");
    var image = $("input[name~='image']").val("");
    Session.set('viewMode', 'add');
  },
  "click a.edit-link": function (event) {
    // console.log(this);
    Session.set('id', this._id);
    Session.set('viewMode', 'edit');
    $("input[name~='title']").val(this.title);
    $("textarea[name~='text']").val(this.text);
    $("input[name~='price']").val(this.price);
    $("input[name~='image']").val(this.image);
    $("html, body").animate({ scrollTop: 0 }, 600);
    return false;
  },
  "click .update-product": function (event) {
    event.preventDefault();
    var id = Session.get('id');
    var obj = {};
    obj.title = $("input[name~='title']").val();
    obj.text = $("textarea[name~='text']").val();
    obj.price = $("input[name~='price']").val();
    obj.image = $("input[name~='image']").val();
    
    console.log(id, obj);
    Meteor.call("updateProduct", id, obj);

    title = $("input[name~='title']").val("");
    text =  $("textarea[name~='text']").val("");
    price = $("input[name~='price']").val("");
    image = $("input[name~='image']").val("");
  },
  "click .toggle-checked": function () {
    // Set the checked property to the opposite of its current value
    Meteor.call("setChecked", this._id, ! this.checked);
  },
  "change .hide-checked input": function (event) {
    Session.set("hideChecked", event.target.checked);
  },
  "click .delete": function () {
    console.log(this.title);
    if (confirm('Are you sure you want to DELETE ' + this.title )) {
      Meteor.call("deleteProduct", this._id);
    // Save it!
    } else {
    // Do nothing!
    }
  },
  "click .save-product": function (event) {
    event.preventDefault();
    var title = $("input[name~='title']").val();
    var text =  $("textarea[name~='text']").val();
    var price = $("input[name~='price']").val();
    var image = $("input[name~='image']").val();
    
    Meteor.call("addProduct", title, text, price, image);

    title = $("input[name~='title']").val("");
    text =  $("textarea[name~='text']").val("");
    price = $("input[name~='price']").val("");
    image = $("input[name~='image']").val("");
    Session.set('viewMode', 'add');


    return false; // Prevent default form submit
  }
});

Accounts.ui.config({
  passwordSignupFields: "EMAIL_ONLY"
});




