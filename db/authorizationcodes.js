var authorizationcodes = global.db.authorizationcodes;

exports.find = function(id, done) {
  return done(null, authorizationcodes.findOne({id: id}));
};

exports.save = function(id, clientID, redirectURI, userID, done) {
  var authCode = authorizationcodes.findOne({id: id});
  authCode.clientID = clientID;
  authCode.redirectURI = redirectURI;
  authCode.userID = userID;
  authorizationcodes.save(authCode);
  return done(null);
};
