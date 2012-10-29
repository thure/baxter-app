var tokens = global.db.tokens;

exports.find = function(id, done) {
  return done(null, tokens.findOne({id: id}));
};

exports.save = function(id, userID, clientID, done) {
  var token = tokens.findOne({id: id});
  token.userID = userID;
  token.clientID = clientID;
  return done(null);
};
