define([
  'jquery',
  'underscore',
  'backbone',
  '../helpers/requests',
  'spin',
  '../collections/imps'
  , '../views/imp-row'
  , 'text!views/imp-table.html'
], function($, _, Backbone, R, Spinner, Imps, ImpRow, impTableTemplate){

  var impTable = Backbone.View.extend({

    el: $('#main-content'),

    initialize: function(){
      this.impRows = {};
    },

    render: function(){
      var self = this;
      this.$table = $(impTableTemplate);
      Imps.each(function(imp, index){
        self.impRows[index] = new ImpRow({model: imp, el: $('.accordion', self.$table)});
        self.impRows[index].render();
      });
      this.$el.append( self.$table );
    },

    hide: function(){
      try{this.$dashboard.remove()}catch(e){}
    },

    events: {

    }

  });

  return new impTable;

});