Template.AdminProductForm.created = function () {
  // this.viewMode = new ReactiveVar();
  // this.viewMode.set('add');
  Session.set('editMode', false);
};
// Template.instance().example.set(type);

Template.AdminProductForm.helpers({
  editMode: function () {
    return Session.get('editMode');
  }
});
Template.AdminProductForm.events({
  'click [data-action=cancel]': function (event) {
    event.preventDefault();
    Session.set('editMode', false);
    var title = $("input[name~='title']").val("");
    var text =  $("textarea[name~='text']").val("");
    var price = $("input[name~='price']").val("");
    var quart = $("input[name~='quart']").val("");
    var image = $("input[name~='image']").val("");
    var imageQt = $("input[name~='image']").val("");
    var imageEx = $("input[name~='image']").val("");
  },
  'click [data-action=update-product]': function (event) {
    event.preventDefault();
    Session.set('editMode', false);
    var id = Session.get('id');
    var obj = {};
    obj.title = $("input[name~='title']").val();
    obj.text = $("textarea[name~='text']").val();
    obj.price = $("input[name~='price']").val();
    obj.quart = $("input[name~='quart']").val();
    obj.image = $("input[name~='image']").val();
    obj.imageQt = $("input[name~='imageQt']").val();
    obj.imageEx = $("input[name~='imageEx']").val();
    
    if (confirm('Are you sure you want to save/edit: \n' + obj.title + ' \n' + obj.price + '\n' + obj.quart + '\n' + obj.text + '\n' + obj.image + '\n' + obj.imageQt + '\n' + obj.imageEx)) {
      Meteor.call("updateProduct", id, obj, function (e, r){
        if (r) {
          title = $("input[name~='title']").val("");
          text =  $("textarea[name~='text']").val("");
          price = $("input[name~='price']").val("");
          quart = $("input[name~='quart']").val("");
          image = $("input[name~='image']").val("");
          imageQt = $("input[name~='imageQt']").val("");
          imageEx = $("input[name~='imageEx']").val("");
        }
      });
    }
  },
  'click [data-action=save-product]': function (event) {
    event.preventDefault();
    Session.set('editMode', false);
    var title = $("input[name~='title']").val();
    var text =  $("textarea[name~='text']").val();
    var price = $("input[name~='price']").val();
    var quart = $("input[name~='quart']").val();
    var image = $("input[name~='image']").val();
    var imageQt = $("input[name~='imageQt']").val();
    var imageEx = $("input[name~='imageEx']").val();
    
    if (confirm('Are you sure you want add product:\n ' + title + '\n' + price + '\n' + quart + '\n' + text + '\n' + image + '\n' + imageQt + '\n' + imageEx)) {
      Meteor.call("addProduct", title, text, price, image, imageQt, imageEx, function (e, r){
        if (r) {
          title = $("input[name~='title']").val("");
          text =  $("textarea[name~='text']").val("");
          price = $("input[name~='price']").val("");
          quart = $("input[name~='quart']").val("");
          image = $("input[name~='image']").val("");
          imageQt = $("input[name~='imageQt']").val("");
          imageEx = $("input[name~='imageEx']").val("");
        }
      });
    }

    return false; // Prevent default form submit
  }
});