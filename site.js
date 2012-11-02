/**
 * Module dependencies.
 */
var passport = require('passport')
  , defer = require("promised-io/promise").Deferred
  , _ = require('underscore')
  ;

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
            cleanImp.endpoints = _.keys(cleanImp.endpoints);
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
