define([
  'jquery',
  'underscore',
  'backbone',
  '../helpers/requests',
  'spin'
  , '../views/imp-endpoint-row'
  , 'text!views/imp-row.html'
], function($, _, Backbone, R, Spinner, impEndpointRow, impRow){

  return Backbone.View.extend({

    initialize: function(){
      this.endpoints = {};
    },

    render: function(){
      var self = this;
      this.$row = $(_.template(impRow, {imp: self.model.attributes}));
      _.each(this.model.get('endpoints'), function(endpoint, i){
        self.endpoints[endpoint] = new impEndpointRow({ el: $('.accordion-inner', self.$row), model: self.model });
        self.endpoints[endpoint].render(i);
      });
      this.$el.append( self.$row );
    },

    hide: function(){
      try{this.$row.remove()}catch(e){}
    },

    events: {
    }

  });

});