/**
 * Module dependencies.
 */
var passport = require('passport')
  , login = require('connect-ensure-login');


exports.index = function(req, res) {
  res.send('OAuth 2.0 Server');
};

exports.loginForm = function(req, res) {
  res.render('login');
};

//exports.login = passport.authenticate('local', {
//  successRedirect: '/result',
//  failureRedirect: '/login',
//  failureFlash: true
//});

exports.result = exports.login = [
  login.ensureLoggedIn(),
  function(req, res){
    res.render('result', {user: req.user});
  }
];

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};
