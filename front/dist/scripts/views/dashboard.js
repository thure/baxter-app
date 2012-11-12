define([ 'jquery'
  , 'underscore'
  , 'backbone'
  , '../helpers/requests'
  , 'spin'
  , '../models/session'
  , 'views/imp-table'
  , 'views/user-table'
  , 'text!views/dashboard.html'
], function($, _, Backbone, R, Spinner, Session, ImpTable, UserTable, dashboardTemplate){

  var dashboardView = Backbone.View.extend({

    el: $('#title-content'),

    render: function(){
      var self = this
        , isSteward = Session.get('type') === 'steward';
      this.$dashboard = $(_.template(dashboardTemplate, {user: Session.attributes}));
      this.$el.append(self.$dashboard);
      ImpTable.render({
        span: isSteward ? 6 : 12
      });
      if(isSteward) UserTable.render({span: 6});
    },

    hide: function(){
      try{
        this.$dashboard.remove();
        ImpTable.hide();
      }catch(e){}
    }

  });

  return new dashboardView;

});