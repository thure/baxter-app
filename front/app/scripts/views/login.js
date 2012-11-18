define([ 'jquery'
  , 'underscore'
  , 'backbone'
  , 'collections/imps'
  , 'models/session'
  , '../helpers/requests'
  , 'spin'
  , 'crypto'
  , 'text!views/login.html'
], function($, _, Backbone, Imps, Session, R, Spinner, crypto, loginTemplate){

  var loginView = Backbone.View.extend({

    el: $('#main-content'),

    render: function(){
      var self = this;
      this.$login = $(loginTemplate);
      this.$el.html(self.$login);
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
      $('#loginSubmit .not-during-spin').css('visibility', 'none');
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
      $('#loginSubmit .not-during-spin').css('visibility', 'visible');
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
          password: crypto.HmacSHA512($('#inputUsername', self.$login).val(), $('#inputPassword', self.$login).val()).toString()
        }
      })
          .done(function(){
            Session.set(arguments[0]['user']);
            Imps.reset(arguments[0]['imps']);
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