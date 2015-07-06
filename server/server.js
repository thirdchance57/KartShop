Meteor.methods({
  addProduct: function (title, text, price, quart, image) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Products.insert({
        title: title,
        text: text,
        price: price,
        quart: quart,
        image: image
    });
    return true;
  },
  deleteProduct: function (productId) {
    Products.remove(productId);
    return true;
  },
  setChecked: function (productId, setChecked) {
    Products.update(productId, { $set: { checked: setChecked} });
  },
  updateProduct: function(productId, obj) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    Products.update({_id: productId}, {$set:obj});
    return true;
  }

});
// Roles.addUsersToRoles('rNCfz5xmShN8mBDuX', ['admin']);
  // START ROLES
  var users = Meteor.users.find({ emails: { $elemMatch: { address: "chrisnewman34@yahoo.com" } } }).fetch();
  // var users = Meteor.users.find({ emails: { $elemMatch: { address: "thirdchance57@hotmail.com" } } }).fetch();
  _.each(users, function (user) {

    // var id;

    // id = Accounts.createUser({
    //   email: user.email,
    //   password: "asdfasdf",
    //   profile: { name: user.name }
    // });

    // if (user.roles.length > 0) {
      // Need _id of existing user record so this call must come 
      // after `Accounts.createUser` or `Accounts.onCreate`
      Roles.addUsersToRoles(user._id, ['admin']);
    // }
  });
