var users = global.db.users;

exports.find = function(id, done) {
  return done(null, users.findOne({id: id}));
};

exports.findByUsername = function(username, done) {
  return done(null, users.findOne({username: username}));
};