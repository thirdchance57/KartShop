Products = new Mongo.Collection("products");

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    products: function () {
      console.log("product.find working");
      return Products.find({});

    }
  }); // END Template.body.helpers

  Template.body.events({
    "submit .new-product": function (event) {
      console.log("new-product function fired");
      var text = event.target.text.value;

      Products.insert({
        text: text,
        // productPrice: text,
        createdAt: new Date()
      });

      event.target.text.value = ""; // Clear form
      console.log(event);

      return false; // Prevent default form submit
    }
  }); // END Template.body.events
} // END isClient