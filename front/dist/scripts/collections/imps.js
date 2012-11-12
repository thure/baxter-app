define([
  'jquery',
  'underscore',
  'backbone',
  '../models/imp'
], function($, _, Backbone, Imp){

  var imps = Backbone.Collection.extend({

    model: Imp

  });

  return new imps;

});