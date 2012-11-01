define([ 'router'], function(Router) {
  return {
    initialize: function(){
      window.session = window.bootstrappedSessionUser;
      Router.initialize();
    }
  };
});