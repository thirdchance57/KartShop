FlowRouter.route('/products', {
    subscriptions: function(params) {
        console.log("subscribe and register this subscription as 'products");
        this.register('products', Meteor.subscribe("products"));
    },
    action: function(params) {
        console.log("Yeah! We are on the products:");
    }
});

FlowRouter.route('/contact', {
    // subscriptions: function(params) {
    //     console.log("subscribe and register this subscription as 'myPost'");
    //     this.register('products', Meteor.subscribe('products'));
    // },
    action: function(params) {
        console.log("Yeah! We are on the contact");
    }
});

FlowRouter.notFound = FlowRouter.go('/');
