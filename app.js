// simple server with a protected resource at /secret secured by OAuth 2

var express = require('express')
  , mongoose = require('mongoose')
  , site = require('./site.js')
  , config = require('./config.js')
  , care = require('./care.js')
  ;

var app = express()
  , db = global.db = mongoose.createConnection(config.db.uri)
  ;

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', function () {

  var Models = {};

  //Database
  var UserSchema = new mongoose.Schema({
    id: Number,
    username: String,
    password: String,
    name: String,
    type: String
  });
  UserSchema.methods.validPassword = function(password){
    return password === this.password;
  };
  Models.Users = db.model('users', UserSchema);

  var ImpSchema = new mongoose.Schema({
    id: Number,
    belongsToUserId: Number,
    usableByUsersId: [Number],
    name: String,
    endpoints: Object
  });
  Models.Imps = db.model('imps', ImpSchema);

  //Middleware
  app.configure(function() {
    app.set('views', __dirname + '/front/dist');
    app.set('view engine', 'ejs');
    // app.use(express.logger());
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.session({ secret: 'keyboard cat' }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  });

  //Authentication
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done) {
    Models.Users.findOne({id: id}, function (err, user) {
      done(err, user);
    });
  });
  passport.use(new LocalStrategy(
    function(username, password, done) {
      Models.Users.findOne({ username: username }, function (err, user) {
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

  app.post('/login', function(req, res, next){
    site.login(req, res, next, Models)
  });

  app.get('/logout', site.logout);

  //Index
  app.get('/', passport.authenticate('session'), function(req, res, next){
    site.index(req, res, next, Models);
  });

  //Imp feeding
  app.put('/trigger/:impId/:endpointName'
    , passport.authenticate('session')
    , function(req, res, next){
    site.trigger(req, res, next, Models.Imps);
  });

  //Imp care
  app.put('/imp/response'
    , care.handleResponse
  );

  app.put('/imp/phone'
    , care.handleCall
  );

  //Administration
  app.get('/users'
    , passport.authenticate('session')
    , function(req, res, next){
    site.getUsers(req, res, next, Models.Users);
  });

  //Rerouting
  app.get(/\/styles(.*)/, function(req, res){
    res.sendfile('front/dist/styles' + req.params[0]);
  });
  app.get(/\/scripts(.*)/, function(req, res){
    res.sendfile('front/dist/scripts' + req.params[0]);
  });

  //Starting
  var port = process.env.PORT || 5000;
  app.listen(port, function() {
    console.log("Baxter service is now listening on port № " + port + ".");
  });

});