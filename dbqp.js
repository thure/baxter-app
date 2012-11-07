/**
 * Module dependencies.
 */
var passport = require('passport')
  , defer = require("promised-io/promise").Deferred
  , _ = require('underscore')
  ;

exports.getUsers = function(req, res, Users){
  var usersP = defer();
  if(!!req.user && req.user.type === 'steward'){
    Users
      .find()
      .lean(true)
      .exec(function(err, users){
        if(err){
          res.status(500);
          usersP.reject(err);
        }else{
          var cleanUsers = _.map(users, function(user){
            return _.omit(user, ['_id', 'password']);
          });
          usersP.resolve(cleanUsers);
        }
      })
  }else{
    res.status(401);
    usersP.reject("Not authenticated.");
  }
  return usersP;
};

exports.getEndpoint = function(req, Imps, impId, endpointName){
  var endpointP = defer();
  if(!!req.user){
    Imps
      .findOne({id: impId, usableByUsersId: req.user.id})
      .select('endpoints')
      .lean(true)
      .exec(function(err, imp){
        if(err){
          endpointP.reject(err);
        }else{
          endpointP.resolve(imp.endpoints[endpointName]);
        }
      });
  }else{
    endpointP.reject("Not authenticated.");
  }
  return endpointP;
};

exports.getImps = function(req, Imps){
  var impP = defer();
  if(!!req.user){
    Imps
      .find({usableByUsersId: req.user.id})
      .select('id name endpoints')
      .lean(true)
      .exec(function(err, imps){
        if(err) {
          impP.reject(err);
        }else{
          var cleanImps = _.map(imps, function(imp){
            var cleanImp = _.omit(imp, ['_id']);
            if(req.user.type === 'steward') cleanImp.endpointDefinitions = imp.endpoints;
            cleanImp.endpoints = _.keys(imp.endpoints);
            return cleanImp;
          });
          impP.resolve(cleanImps);
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
