Meteor.publish("products", function () {
    return Products.find();
});
Meteor.publish('singleProduct', function (productId) {
  return Products.find({ _id: productId });
});