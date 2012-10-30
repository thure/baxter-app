// simple server with a protected resource at /secret secured by OAuth 2

var express = require('express')
  , mongoose = require('mongoose')
  , config = require('./config.js')
  ;

var app = express()
  , db = global.db = mongoose.createConnection(config.db.uri)
  ;

db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', function () {

  var port = process.env.PORT || 5000;
  app.listen(port, function() {
    console.log("Listening on " + port);
  });

});