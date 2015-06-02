Meteor.publish("products", function () {
    return Products.find();
});

Meteor.methods({
  addProduct: function (title, text, price, image) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Products.insert({
        title: title,
        text: text,
        price: price,
        image: image
    });
  },
  deleteProduct: function (productId) {
    Products.remove(productId);
  },
  setChecked: function (productId, setChecked) {
    Products.update(productId, { $set: { checked: setChecked} });
  },

});
// Roles.addUsersToRoles('rNCfz5xmShN8mBDuX', ['admin']);
  // START ROLES
  var users = [
    ];

  _.each(users, function (user) {
    // var id;

    // id = Accounts.createUser({
    //   email: user.email,
    //   password: "asdfasdf",
    //   profile: { name: user.name }
    // });

    if (user.roles.length > 0) {
      // Need _id of existing user record so this call must come 
      // after `Accounts.createUser` or `Accounts.onCreate`
      Roles.addUsersToRoles(id, user.roles);
    }
  });
