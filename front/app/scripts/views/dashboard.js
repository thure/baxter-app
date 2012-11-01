define([
  'jquery',
  'underscore',
  'backbone',
  '../helpers/requests',
  'spin',
  'text!views/dashboard.html'
], function($, _, Backbone, R, Spinner, dashboardTemplate){

  var dashboardView = Backbone.View.extend({

    el: $('#main-content'),

    render: function(){
      var self = this;
      this.$dashboard = $(_.template(dashboardTemplate, {user: window.session}));
      this.$el.append(self.$dashboard);
    },

    hide: function(){
      try{this.$dashboard.remove()}catch(e){}
    },

    events: {

    }

  });

  return new dashboardView;

});