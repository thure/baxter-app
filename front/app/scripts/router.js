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
    },

    routes: {
      // global
      '': 'index',
      'login': 'login',
      'dashboard': 'dashboard',
      'control': 'control',
      'guests': 'guests',
      'imps': 'imps',

      // default
      '*path': 'default'
    },

    index: function(){
      topNavigation.render();
      if(!Session.get('name')){
        this.navigate('login',{trigger: true});
      }else{
        this.navigate('dashboard',{trigger: true});
      }
    },

    login: function(){
      topNavigation.render();
      login.render();
    },

    dashboard: function(){
      topNavigation.render();
      if(!!Session.get('name')){
        login.hide();
        dashboard.render();
      }else{
        this.navigate('login',{trigger: true});
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