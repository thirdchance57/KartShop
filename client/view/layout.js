// analytics.track();
// analytics.page('root', function(){
//   console.log(Meteor.settings.public);
// });
Template.layout.rendered = function () {
    var self = this; //In case you need it but self.data IS NOT REACTIVE

  this.autorun(function(){
    //This is reactive
    var data = Template.currentData();
    //place your analitycs code here
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-65052850-1', 'auto');
    ga('send', 'pageview');
  });
};
