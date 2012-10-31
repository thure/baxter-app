/**
 * Module dependencies.
 */
var passport = require('passport')
  , login = require('connect-ensure-login');

exports.loginForm = function(req, res) {
  res.render('login');
};

exports.result = [
  login.ensureLoggedIn(),
  function(req, res){
    res.render('result', {user: req.user});
  }
];

exports.login = [
  function(){
    console.log('Trying to log in!');
  },
  passport.authenticate('local', {
    successRedirect: '/result',
    failureRedirect: '/login'
  })
];

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};
