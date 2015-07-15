Template.ProductDetail.helpers({
  getProduct: function () {
    return Products.findOne();
  }
});

Template.ProductDetail.events({
  'click [data-action=purchase]': function () {
    FlowRouter.go('/contact');
  }
});