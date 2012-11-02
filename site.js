/**
 * Module dependencies.
 */
var passport = require('passport')
  , defer = require("promised-io/promise").Deferred
  , _ = require('underscore')
  ;

exports.getImps = function(req, Imps){
  var impP = defer();
  if(!!req.user){
    Imps.find({usableByUsersId: req.user.id}, function(err, imps){
      if(err) {
        impP.reject(err);
      }else{
        impP.resolve(imps);
      }
    });
  }else{
    impP.reject("Not authenticated.");
  }
  return impP.promise;
};

exports.logout = function(req, res) {
  req.logout();
  res.status(200).json({"message": "You've successfully logged out."});
};
