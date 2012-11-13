/**
 * Module dependencies.
 */
var passport = require('passport')
  , defer = require("promised-io/promise").Deferred
  , all = require("promised-io/promise").all
  , _ = require('underscore')
  ;

var getUsers = function(req, Users){
  var usersP = defer();
  if(!!req.user && req.user.type === 'steward'){
    Users
      .find()
      .lean(true)
      .exec(function(err, users){
        if(err){
          usersP.reject(err);
        }else{
          var cleanUsers = _.map(users, function(user){
            return _.omit(user, ['password']);
          });
          usersP.resolve(cleanUsers);
        }
      })
  }else{
    usersP.reject("Not authenticated.");
  }
  return usersP.promise;
};

exports.getUsers = getUsers;

var getEndpoint = function(req, Imps, impId, endpointName){
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
  return endpointP.promise;
};

exports.getEndpoint = getEndpoint;

var getImps = function(req, Imps){
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

exports.getImps = getImps;

var getImpsAndUsers = function(req, Models){

  var bothP = defer()
    , impP = getImps(req, Models.Imps)
    , usersP = getUsers(req, Models.Users);

  all(impP, usersP).then(
    function(impsAndUsers){
      bothP.resolve(impsAndUsers);
    },
    function(error){
      bothP.reject(error);
    }
  );

  return bothP.promise;

};

exports.getImpsAndUsers = getImpsAndUsers;