FlowRouter.route('/', {
  subscriptions: function() {
    this.register('products', Meteor.subscribe('products'));
  },
  action: function() {
    FlowLayout.render('layout', { top: 'navBar', main: 'Main', footer: 'footerTemplate' });
    // analytics.track();
    // analytics.page('layout', function(){
    //   console.log('analytics fired');
    // });
  },
  name: 'root'
});

FlowRouter.route('/product/:productId', {
  subscriptions: function(params, queryParams) {
    this.register('product', Meteor.subscribe('singleProduct', params.productId));
  },
  action: function() {
    FlowLayout.render('layout', { top: 'navBar', main: 'ProductDetail', footer: 'footerTemplate' });
  },
  name: 'product'
});

// FlowRouter.notFound = FlowRouter.go('/');
FlowRouter.notFound = {
  action : function () {
    FlowRouter.go('/');
    console.log("route not found");
  }
};