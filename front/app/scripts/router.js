define([
  'backbone',
], function(Backbone){

  var AppRouter = Backbone.Router.extend({

    initialize: function(){
      console.log('Router initialized');
    },

    routes: {
      // global
      '': 'index',

      // default
      '*path': 'default'
    },

    index: function(){
      console.log('At index.');
    }
  });

  return {
    initialize: function(){
      window.Router = new AppRouter;
      Backbone.history.start();
    }
  };

});