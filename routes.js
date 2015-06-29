FlowRouter.route('/', {
    // subscriptions: function(params) {
    //     console.log("subscribe and register this subscription as 'products");
    //     this.register('products', Meteor.subscribe("products"));
    // },
    // action: function(params) {
    //     console.log("Yeah! We are on the post:");
    // }
});

FlowRouter.notFound = FlowRouter.go('/');
