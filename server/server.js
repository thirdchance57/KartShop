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
  }
});
// Roles.addUsersToRoles('rNCfz5xmShN8mBDuX', ['admin']);
  // START ROLES
  // var users = [
  //     // {name:"Normal User",email:"normal@example.com",roles:[]},
  //     // {name:"View-Secrets User",email:"view@example.com",roles:['view-secrets']},
  //     // {name:"Manage-Users User",email:"manage@example.com",roles:['manage-users']},
  //     // {name:"Admin User",email:"admin@example.com",roles:['admin']}
  //   ];

  // _.each(users, function (user) {
  //   var id;

  //   id = Accounts.createUser({
  //     email: user.email,
  //     password: "apple1",
  //     profile: { name: user.name }
  //   });

  //   if (user.roles.length > 0) {
  //     // Need _id of existing user record so this call must come 
  //     // after `Accounts.createUser` or `Accounts.onCreate`
  //     Roles.addUsersToRoles(id, user.roles);
  //   }
  // });
