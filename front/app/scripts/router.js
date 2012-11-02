define([ 'backbone'
  , 'collections/imps'
  , 'models/session'
  , 'views/top-navigation'
  , 'views/login'
  , 'views/dashboard'
], function(Backbone, Imps, Session, topNavigation, login, dashboard){

  var AppRouter = Backbone.Router.extend({

    initialize: function(){
      console.log('Router initialized');
      if(window.bootstrappedSessionUser) Session.set(window.bootstrappedSessionUser);
      if(window.bootstrappedSessionImps) Imps.reset(window.bootstrappedSessionImps);
      window.session = Session;
      window.imps = Imps;
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