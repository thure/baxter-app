// simple server with a protected resource at /secret secured by OAuth 2

var express = require('express')
  , mongoose = require('mongoose')
  , request = require('request')
  , when = require("promised-io/promise").when
  , login = require('connect-ensure-login')
  , _ = require('underscore')
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
    name: String,
    type: String
  });
  UserSchema.methods.validPassword = function(password){
    return password === this.password;
  };
  var Users = db.model('users', UserSchema);

  var ImpSchema = new mongoose.Schema({
    id: Number,
    belongsToUserId: Number,
    usableByUsersId: [Number],
    name: String,
    endpoints: Object
  });
  var Imps = db.model('imps', ImpSchema);

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
    Users.findOne({id: id}, function (err, user) {
      done(err, user);
    });
  });
  passport.use(new LocalStrategy(
    function(username, password, done) {
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

  //Routing (insert login.ensureLoggedIn() if protected endpoint)
  app.get('/', passport.authenticate('session'), function(req, res) {
    when(site.getImps(req, Imps), function(imps){
      res.render('index', {
        user: _.omit(req.user.toJSON(), ['id', '_id']),
        imps: imps
      });
    }, function(error){
      res.render('index', {
        user: null,
        imps: null
      });
    });
  });

  app.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err) }
      if (!user) { return res.status(401).json({"message": "I'm afraid your username or password was incorrect."}) }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        when(site.getImps(req, Imps), function(imps){
          return res.status(200).json({
            "message": "You've successfully logged in!" ,
            "user": _.omit(user.toJSON(), ['id', '_id']),
            "imps": imps
          });
        }, function(impErr){
          return res.status(500).json({
            "message": "There was a problem getting the imps.",
            "error": impErr
          });
        });
      });
    })(req, res, next);
  });

  app.put('/trigger/:impId/:endpointName'
    //, passport.authenticate('session')
    , function(req, res, next){
      req.user = {id: 1};
    if(!!req.user){
      var impId = parseInt(req.params.impId)
        , endpointName = decodeURIComponent(req.params.endpointName);
      when(site.getEndpoint(req, Imps, impId, endpointName), function(endpoint){
        request({
          uri: endpoint.URI,
          method: endpoint.method,
          json: JSON.parse(endpoint.payload)
        }, function(error, response, body){
          if(error) return res.status(response.statusCode).send(body);
          return res.status(200).json({
            "message": "Imp successfully triggered"
          });
        });
      }, function(endpointErr){
        res.status(500).json({
          "message": "There was a problem getting the endpoint.",
          "error": endpointErr
        });
      });
    }else{
      res.status(401).json({
        "message": "It doesn't appear that you're logged in. Please log in!"
      });
    }
  });

  app.get('/logout', site.logout);

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