define([
  'jquery',
  'underscore',
  'backbone',
  '../helpers/requests',
  'spin',
  'text!views/login.html'
], function($, _, Backbone, R, Spinner, loginTemplate){

  var loginView = Backbone.View.extend({

    el: $('#main-content'),

    render: function(){
      var self = this;
      this.$login = $(loginTemplate);
      this.$el.append(self.$login);
    },

    hide: function(){
      try{this.$login.remove()}catch(e){}
    },

    events: {
      'click #loginSubmit': 'submitLogin'
    },

    lockForm: function(){
      $('input, button', this.$login).prop('disabled', true);
      $('a.btn', this.$login).addClass('disabled');
      $('#loginSubmit .not-during-spin').hide();
      this.spinner = new Spinner({
        lines: 9,
        length: 3,
        width: 2,
        radius: 2,
        color: '#fff',
        trail: 60
      }).spin($('#loginSubmit').get(0));
    },

    unlockForm: function(){
      this.spinner.stop();
      $('#loginSubmit .not-during-spin').show();
      $('a.btn', this.$login).removeClass('disabled');
      $('input, button', this.$login).prop('disabled', false);
    },

    submitLogin: function(e){
      this.lockForm();
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
            window.Router.navigate('dashboard', {trigger: true});
          })
          .fail(function(){
            console.log("Couldn't log in!",arguments);
          })
          .always(function(){
            self.unlockForm();
          });
    }

  });

  return new loginView;

});