define([ 'router'], function(Router) {
  return {
    initialize: function(){
      window.session = window.bootstrappedSessionUser;
      window.imps = window.bootstrappedSessionImps;
      Router.initialize();
    }
  };
});