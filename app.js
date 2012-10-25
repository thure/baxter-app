var express = require('express')
  , mongoose = require('mongoose')
  , config = require('./config.js')
  ;

var app = express()
  , db = mongoose.createConnection(config.db.uri);

// Routing
app.get('/', function(request, response) {
  response.send('Hello World!');
});

// Starting
var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});