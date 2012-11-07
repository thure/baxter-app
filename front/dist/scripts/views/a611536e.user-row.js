define([
  'jquery',
  'underscore',
  'backbone',
  '../helpers/requests',
  'spin'
  , 'text!views/user-row.html'
], function($, _, Backbone, R, Spinner, userRow){

  return Backbone.View.extend({

    initialize: function(){
    },

    render: function(){
      var self = this;
      this.$row = $(_.template(userRow, {user: self.model.attributes}));
      this.$el.append( self.$row );
    },

    hide: function(){
      try{this.$row.remove()}catch(e){}
    },

    events: {
    }

  });

});