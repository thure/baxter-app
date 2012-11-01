define([
  'jquery',
  'underscore',
  'backbone',
  '../helpers/requests',
  'text!views/login.html'
], function($, _, Backbone, R, loginTemplate){

  var loginView = Backbone.View.extend({

    el: $('body'),

    render: function(){
      var self = this;
      this.$login = $(loginTemplate);
      this.$el.append(self.$login);
    },

    hide: function(){
      this.$login.remove();
    },

    events: {
      'click .submit': 'submitLogin'
    },

    submitLogin: function(e){
      console.log('Submitting!');
      e.preventDefault();
      var self = this
        , loginRequest = R.request({
        endpoint: 'login',
        method: 'POST',
        payload: {
          username: $('#inputUsername', self.$login).val(),
          password: $('#inputPassword', self.$login).val()
        }
      })
          .done(function(){
            window.session = arguments[0]['user'];
            console.log('Logged in!');
          })
          .fail(function(){
            console.log("Couldn't log in!");
          });
    }

  });

  return new loginView;

});