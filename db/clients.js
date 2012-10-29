var clients = global.db.clients;

exports.find = function(id, done) {
  return done(null, clients.findOne({id: id}));
};

exports.findByClientId = function(clientId, done) {
  return done(null, clients.findOne({clientId: clientId}));
};