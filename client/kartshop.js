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
  productCount: function () {
    return Products.find({checked: {$ne: true}}).count();
  }
}); // END Template.body.helpers

Template.body.events({
  "click .toggle-checked": function () {
    // Set the checked property to the opposite of its current value
    Meteor.call("setChecked", this._id, ! this.checked);
  },
  "change .hide-checked input": function (event) {
    Session.set("hideChecked", event.target.checked);
  },
  "click .delete": function () {
    Meteor.call("deleteProduct", this._id);
  },
  "submit .new-product": function (event) {
    console.log("new-product function fired");
    event.preventDefault();
    var title = event.target.title.value;
    var text = event.target.text.value;
    var price = event.target.price.value;
    var image = event.target.image.value;
    
    Meteor.call("addProduct", title, text, price, image);

    event.target.title.value = ""; // Clear after submit
    event.target.text.value = ""; // Clear after submit
    event.target.price.value = ""; // Clear price
    event.target.image.value = "";
    console.log(event);

    return false; // Prevent default form submit
  }
}); // END Template.body.events

Accounts.ui.config({
  passwordSignupFields: "EMAIL_ONLY"
});




