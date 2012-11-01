define([
  'jquery',
  'underscore',
  'backbone',
  '../helpers/requests',
  'spin',
  'text!views/top-navigation.html'
], function($, _, Backbone, R, Spinner, topNavigationTemplate){

  var dashboardView = Backbone.View.extend({

    el: $('#top-navigation'),

    render: function(){
      var self = this;
      this.$topNavigation = $(_.template(topNavigationTemplate, {user: window.session}));
      this.$el.html(self.$topNavigation);
    },

    events: {

    }

  });

  return new dashboardView;

});