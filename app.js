var express = require('express')
  , mongoose = require('mongoose')
  , config = require('./config.js')
  ;

var app = express();
var db = global.db = mongoose.createConnection(config.db.uri);

console.log('Connecting to DB...');
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', function () {

  console.log('Successfully connected to DB. Starting servers.');

  var passport = require('passport')
    , site = require('./site')
    , oauth2 = require('./oauth2')
    , user = require('./user');

  // Middleware
  app.set('view engine', 'ejs');
  app.use(express.logger());
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({ secret: 'keyboard cat' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

  // Routing
  require('./auth');

  app.get('/', site.index);
  app.get('/login', site.loginForm);
  app.post('/login', site.login);
  app.get('/logout', site.logout);
  app.get('/account', site.account);

  app.get('/dialog/authorize', oauth2.authorization);
  app.post('/dialog/authorize/decision', oauth2.decision);
  app.post('/oauth/token', oauth2.token);

  app.get('/api/userinfo', user.info);

  var port = process.env.PORT || 5000;
  app.listen(port, function() {
    console.log("Listening on " + port);
  });


});