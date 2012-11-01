/**
 * Module dependencies.
 */
var passport = require('passport')
  , _ = require('underscore')
  ;

exports.index = function(req, res) {
  res.render('index', {user: !!req.user ? _.omit(req.user.toJSON(), ['id', '_id']): void(0) });
};

exports.login = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err) }
    if (!user) { return res.status(401).json({"message": "I'm afraid your username or password was incorrect."}) }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.status(200).json({
        "message": "You've successfully logged in!" ,
        "user": _.omit(user.toJSON(), ['id', '_id'])
      });
    });
  })(req, res, next);
};

exports.logout = function(req, res) {
  req.logout();
  res.status(200).json({"message": "You've successfully logged out."});
};
