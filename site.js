var dbqp = require('./dbqp.js')
  , care = require('./care.js')
  , passport = require('passport')
  , when = require("promised-io/promise").when
  , request = require('request')
  , _ = require('underscore')
  ;

exports.login = function(req, res, next, Models) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err) }
    if (!user) { return res.status(401).json({"message": "I'm afraid your username or password was incorrect."}) }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      when(
        req.user.type === 'steward' ? dbqp.getImpsAndUsers(req, Models) : dbqp.getImps(req, Models.Imps),
        function(impsAndMaybeUsers){
        return res.status(200).json({
          "message": "You've successfully logged in!" ,
          "user": _.omit(user.toJSON(), ['id', '_id', 'password']),
          "imps": impsAndMaybeUsers[0],
          "users": !!impsAndMaybeUsers[1] ? impsAndMaybeUsers[1] : void(0)
        });
      }, function(err){
        return res.status(500).json({
          "message": "There was a problem getting the things you'll need.",
          "error": err
        });
      });
    });
  })(req, res, next);
};

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};

exports.index = function(req, res, next, Models){
  when(dbqp.getImpsAndUsers(req, Models), function(impsAndUsers){
    res.render('index', {
      user: _.omit(req.user.toJSON(), ['id', '_id']),
      imps: impsAndUsers[0],
      users: impsAndUsers[1]
    });
  }, function(error){
    res.render('index', {
      user: null,
      imps: null,
      users: null
    });
  });
};

exports.trigger = function(req, res, next, Imps){
  if(!!req.user){
    var impId = parseInt(req.params.impId)
      , endpointName = decodeURIComponent(req.params.endpointName);
    when(dbqp.getEndpoint(req, Imps, impId, endpointName), function(endpoint){
      request({
        uri: endpoint.URI,
        method: endpoint.method,
        json: JSON.parse(endpoint.payload)
      }, function(error, response, body){
        if(error) return res.status(response.statusCode).send(body);
        care.waitForResponse(req, res, next);
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
};

exports.getUsers = function(req, res, next, Users){
  when(dbqp.getUsers(req, res, Users), function(users){
    res.status(200).json(users);
  }, function(err){
    res.json({
      "message": "There was a problem getting users.",
      "error": err
    });
  });
};

exports.getImps = function(req, res, next, Imps){
  when(dbqp.getImps(req, res, Imps), function(imps){
    res.status(200).json(imps);
  }, function(err){
    res.json({
      "message": "There was a problem getting users.",
      "error": err
    });
  });
};