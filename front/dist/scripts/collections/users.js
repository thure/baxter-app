define([
  'jquery',
  'underscore',
  'backbone',
  '../models/user'
], function($, _, Backbone, User){

  var users = Backbone.Collection.extend({

    model: User

  });

  return new users;

});