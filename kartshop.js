Products = new Mongo.Collection("products");

if (Meteor.isClient) {
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
      var text = event.target.text.value;
      var price = event.target.price.value;
      
      Meteor.call("addProduct", text, price);

      event.target.text.value = ""; // Clear after submit
      event.target.price.value = ""; // Clear price
      console.log(event);

      return false; // Prevent default form submit
    }
  }); // END Template.body.events

  Accounts.ui.config({
    passwordSignupFields: "EMAIL_ONLY"
  });

} // END .isClient

Meteor.methods({
  addProduct: function (text, price) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Products.insert({
        text: text,
        price: price,
        createdAt: new Date()
    });
  },
  deleteProduct: function (productId) {
    Products.remove(productId);
  },
  setChecked: function (productId, setChecked) {
    Products.update(productId, { $set: { checked: setChecked} });
  }
}); // END .methods

if (Meteor.isServer) {
  Meteor.publish("products", function () {
    return Products.find();
  });


  // START ROLES
  var users = [
      {name:"Chance",email:"chance@gmail.com",roles:['admin']},
      {name:"Chris",email:"chris@gmail.com",roles:['admin']}
    ];

  _.each(users, function (user) {
    var id;

    id = Accounts.createUser({
      email: user.email,
      password: "asdfasdf",
      profile: { name: user.name }
    });

    if (user.roles.length > 0) {
      // Need _id of existing user record so this call must come 
      // after `Accounts.createUser` or `Accounts.onCreate`
      Roles.addUsersToRoles(id, user.roles);
    }
  });
  // END ROLES


} // END .isServer



