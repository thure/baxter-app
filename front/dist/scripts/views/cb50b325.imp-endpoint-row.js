define([
  'jquery',
  'underscore',
  'backbone',
  '../helpers/requests',
  'spin'
  , 'text!views/imp-endpoint-row.html'
], function($, _, Backbone, R, Spinner, impEndpointRow){

  return Backbone.View.extend({

    render: function(index){
      var self = this;
      this.endpoint = self.model.get('endpoints')[index];
      this.$endpoint = $(_.template(impEndpointRow, {endpoint: self.endpoint, imp: self.model.attributes}));
      this.$el.append( self.$endpoint );
    },

    hide: function(){
      try{this.$endpoint.remove()}catch(e){}
    },

    events: {
      'click button': 'trigger'
    },

    trigger: function(e){
      var self = this
        , $button = $(e.target);
      R.request({
        endpoint: 'trigger/'+ self.model.get('id') + '/' + encodeURIComponent(self.endpoint),
        method: 'PUT'
      }).done(function(){
          console.log('Success!')
        }).fail(function(){
          console.log('Failed!')
        });
    }

  });

});