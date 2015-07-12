FlowRouter.route('/', {
  subscriptions: function(params) {
    this.register('products', Meteor.subscribe('products'));
  },
  action: function() {
    FlowLayout.render('layout', { top: 'navBar', main: 'Main', footer: 'footerTemplate' });
  },
  name: 'root'
});

// FlowRouter.route('/product/:id', {
//   subscriptions: function(params) {
//     this.register('products', Meteor.subscribe('products'));
//   },
//   action: function() {
//     FlowLayout.render('ProductDetail');
//   }
// });

// FlowRouter.notFound = FlowRouter.go('/');
FlowRouter.notFound = {
  action : function () {
    FlowRouter.go('/');
    console.log("route not found");
  }
};