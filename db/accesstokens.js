var mongoose = require('mongoose');
var tokens = global.db.collection('tokens');

var tokenSchema = new mongoose.Schema({
  id: Number,
  userId: Number,
  clientId: Number
});

var Token = global.db.model('Token', tokenSchema);

exports.find = function(id, done) {
  return done(null, tokens.findOne({id: id}));
};

exports.save = function(id, userID, clientID, done) {
  var token = tokens.findOne({id: id});
  token.userID = userID;
  token.clientID = clientID;
  return done(null);
};
