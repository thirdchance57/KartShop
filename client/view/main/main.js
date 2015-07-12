Template.Main.helpers({
  products: function () {
    return Products.find({}, {sort: {createdAt: -1}});
  }
});

Template.Main.events({
  "click [data-action=product]": function () {
    FlowRouter.go('/product/' + this._id);
  },
  "click a.edit-link": function (event) {
    Session.set('editMode', true);
    Session.set('id', this._id);
    $("input[name~='title']").val(this.title);
    $("textarea[name~='text']").val(this.text);
    $("input[name~='price']").val(this.price);
    $("input[name~='quart']").val(this.quart);
    $("input[name~='image']").val(this.image);
    $("html, body").animate({ scrollTop: 0 }, 600);
    return false;
  },
  "click [data-action=delete-product]": function () {
    console.log(this.title);
    if (confirm('Are you sure you want to DELETE ' + this.title ))
      Meteor.call("deleteProduct", this._id);
  }
});

Accounts.ui.config({
  passwordSignupFields: "EMAIL_ONLY"
});