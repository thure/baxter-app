var mongoose = require('mongoose');
var authorizationcodes = global.db.collection('authorizationcodes');

var authorizationcodeSchema = new mongoose.Schema({
  id: Number,
  clientId: Number,
  redirectURI: String,
  userId: Number
});

var Authorizationcode = global.db.model('Authorizationcode', authorizationcodeSchema);

exports.find = function(id, done) {
  return done(null, authorizationcodes.findOne({id: id}));
};

exports.save = function(id, clientId, redirectURI, userId, done) {
  var authCode = authorizationcodes.findOne({id: id});
  authCode.clientId = clientId;
  authCode.redirectURI = redirectURI;
  authCode.userId = userId;
  authorizationcodes.save(authCode);
  return done(null);
};