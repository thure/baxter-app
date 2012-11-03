define([
  'jquery',
  'underscore',
  'backbone',
  '../helpers/requests',
  'spin',
  '../collections/users'
  , '../views/user-row'
  , 'text!views/user-table.html'
], function($, _, Backbone, R, Spinner, Users, UserRow, userTableTemplate){

  var impTable = Backbone.View.extend({

    el: $('#main-content'),

    initialize: function(){
      this.userRows = {};
    },

    render: function(opts){
      var self = this;
      this.$table = $(_.template(userTableTemplate, {span: opts.span}));
      Users.each(function(user, index){
        self.userRows[index] = new UserRow({model: user, el: $('tbody', self.$table)});
        self.userRows[index].render();
      });
      this.$el.append( self.$table );
    },

    hide: function(){
      try{
        this.$table.remove()
      }catch(e){}
    },

    events: {

    }

  });

  return new impTable;

});