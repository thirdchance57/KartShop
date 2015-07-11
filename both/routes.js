FlowRouter.route('/', {
  subscriptions: function(params) {
    console.log("subscribe and register this subscription as 'products");
    this.register('products', Meteor.subscribe("products"));
  },
  action: function(params) {
    console.log("Yeah! We are on the products:");
      // FlowLayout.render("mainLayout", {area: "blog"});
  }
});

FlowRouter.route('/products/:id', {
  subscriptions: function(params) {
    console.log("subscribe and register this subscription as 'product/id'");
    this.register('products', Meteor.subscribe('products'));
  },
  action: function(params) {
    console.log("Yeah! We are on the product ID");
  }
});

// FlowRouter.notFound = FlowRouter.go('/');