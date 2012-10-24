var express = require('express');
var app = express();

// Routing

app.get('/', function(request, response) {
  response.send('Hello World!');
});

// Starting
var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});