var mongoose = require('mongoose');
var users = global.db.collection('users');

var userSchema = new mongoose.Schema({
  id: Number,
  username: String,
  password: String,
  name: String
});

var User = global.db.model('User', userSchema);

exports.find = function(id, done) {
  return done(null, users.findOne({id: id}));
};

exports.findByUsername = function(username, done) {
  return done(null, users.findOne({username: username}));
};