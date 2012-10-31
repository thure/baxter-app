// simple server with a protected resource at /secret secured by OAuth 2

var express = require('express')
  , mongoose = require('mongoose')
  , config = require('./config.js')
  , site = require('./site.js')
  ;

var app = express()
  , db = global.db = mongoose.createConnection(config.db.uri)
  ;

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', function () {

  //Database
  var UserSchema = new mongoose.Schema({
    id: Number,
    username: String,
    password: String,
    name: String
  });
  UserSchema.methods.validPassword = function(password){
    console.log('Validating password: ', password, this.password);
    return password === this.password;
  };

  var Users = db.model('users', UserSchema);

  //Authentication
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done) {
    Users.findOne(id, function (err, user) {
      done(err, user);
    });
  });
  passport.use(new LocalStrategy(
    function(username, password, done) {
      console.log('Retrieving user ', username);
      Users.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Unknown user' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Invalid password' });
        }
        return done(null, user);
      });
    }
  ));

  //Middleware
  app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.logger());
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.session({ secret: 'keyboard cat' }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  });

  //Routing
  app.get('/', function(req, res){ res.redirect('/login') });
  app.get('/login', site.loginForm);
  app.post('/login', site.login);
  app.get('/result', site.result);
  app.get('/logout', site.logout);

  //Starting
  var port = process.env.PORT || 5000;
  app.listen(port, function() {
    console.log("Listening on " + port);
  });

});