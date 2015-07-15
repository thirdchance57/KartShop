Template.navBar.events({
  'click [data-action=header-title]': function () {
    FlowRouter.go('/');
  }
});