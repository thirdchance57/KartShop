Template.ProductDetail.helpers({
  getProduct: function () {
    return Products.findOne();
  }
});