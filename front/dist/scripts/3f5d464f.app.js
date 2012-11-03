define([ 'router'
  , 'collections/imps'
  , 'models/session'
], function(Router, Imps, Session) {
  return {
    initialize: function(){
      if(window.bootstrappedSessionUser) Session.set(window.bootstrappedSessionUser);
      if(window.bootstrappedSessionImps) Imps.reset(window.bootstrappedSessionImps);
      window.session = Session;
      window.imps = Imps;
      Router.initialize();
    }
  };
});