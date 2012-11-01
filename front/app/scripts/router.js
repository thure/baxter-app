define([ 'backbone'
  ,'views/login'
], function(Backbone, login){

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
      if(!window.session){
        this.login();
      }
    },

    login: function(){
      console.log('Gonna log you in now.');
      login.render('body');
    }

  });

  return {
    initialize: function(){
      window.Router = new AppRouter;
      Backbone.history.start();
    }
  };

});