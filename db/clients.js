var mongoose = require('mongoose');
var clients = global.db.collection('clients');

var clientSchema = new mongoose.Schema({
  id: Number,
  name: String,
  clientId: Number,
  clientSecret: String
});

var Client = global.db.model('Client', clientSchema);

exports.find = function(id, done) {
  return done(null, clients.findOne({id: id}));
};

exports.findByClientId = function(clientId, done) {
  return done(null, clients.findOne({clientId: clientId}));
};