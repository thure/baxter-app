define([ 'backbone'
  , 'views/top-navigation'
  , 'views/login'
  , 'views/dashboard'
], function(Backbone, topNavigation, login, dashboard){

  var AppRouter = Backbone.Router.extend({

    initialize: function(){
      console.log('Router initialized');
    },

    routes: {
      // global
      '': 'index',
      'dashboard': 'dashboard',
      'control': 'control',
      'guests': 'guests',
      'imps': 'imps',

      // default
      '*path': 'default'
    },

    index: function(){
      topNavigation.render();
      console.log('At index.');
      if(!window.session){
        this.login();
      }else{
        this.dashboard();
      }
    },

    login: function(){
      topNavigation.render();
      console.log('Gonna log you in now.');
      login.render();
    },

    dashboard: function(){
      topNavigation.render();
      if(window.session){
        login.hide();
        dashboard.render();
      }else{
        this.login();
      }
    },

    control: function(){
      console.log('Control');
    },
    guests: function(){
      console.log('Guests');
    },
    imps: function(){
      console.log('Imps');
    }

  });

  return {
    initialize: function(){
      window.Router = new AppRouter;
      Backbone.history.start();
    }
  };

});