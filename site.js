/**
 * Module dependencies.
 */
var login = require('connect-ensure-login');

exports.loginForm = function(req, res) {
  res.render('login');
};

exports.result = [
  login.ensureLoggedIn(),
  function(req, res){
    res.render('result', {user: req.user});
  }
];

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};
