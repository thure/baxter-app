define([ 'router'
  , 'collections/imps'
  , 'collections/users'
  , 'models/session'
], function(Router, Imps, Users, Session) {
  return {
    initialize: function(){
      if(window.bootstrappedSessionUser) Session.set(window.bootstrappedSessionUser);
      if(window.bootstrappedSessionImps) Imps.reset(window.bootstrappedSessionImps);
      if(window.bootstrappedUsers) Users.reset(window.bootstrappedUsers);
      window.session = Session;
      window.imps = Imps;
      window.users = Users;
      Router.initialize();
    }
  };
});