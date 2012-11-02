define([ 'jquery'
  , 'underscore'
  , 'backbone'
  , '../helpers/requests'
  , 'spin'
  , '../models/session'
  , 'views/imp-table'
  , 'text!views/dashboard.html'
], function($, _, Backbone, R, Spinner, Session, ImpTable, dashboardTemplate){

  var dashboardView = Backbone.View.extend({

    el: $('#main-content'),

    render: function(){
      var self = this;
      this.$dashboard = $(_.template(dashboardTemplate, {user: Session.attributes}));
      this.$el.append(self.$dashboard);
      ImpTable.render();
    },

    hide: function(){
      try{this.$dashboard.remove()}catch(e){}
    },

    events: {

    }

  });

  return new dashboardView;

});