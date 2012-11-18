require.config({
  shim: {
    'spin': {
      exports: 'Spinner'
    },
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'crypto': {
      exports: 'CryptoJS'
    },
    'bootstrap-affix': {
      deps: ['jquery']
    },
    'bootstrap-alert': {
      deps: ['jquery']
    },
    'bootstrap-button': {
      deps: ['jquery']
    },
    'bootstrap-collapse': {
      deps: ['jquery']
    },
    'bootstrap-dropdown': {
      deps: ['jquery']
    },
    'bootstrap-modal': {
      deps: ['jquery']
    },
    'bootstrap-tooltip': {
      deps: ['jquery']
    },
    'bootstrap-popover': {
      deps: ['jquery', 'bootstrap-tooltip']
    },
    'bootstrap-scrollspy': {
      deps: ['jquery']
    },
    'bootstrap-tab': {
      deps: ['jquery']
    },
    'bootstrap-transition': {
      deps: ['jquery']
    },
    'bootstrap-typeahead': {
      deps: ['jquery']
    }
  },

  paths: {
    'jquery': 'vendor/jquery.min',
    'underscore': 'vendor/underscore/underscore',
    'backbone': 'vendor/backbone/backbone',
    'spin': 'vendor/spin/spin.min',
    'crypto': 'vendor/CryptoJS/hmac-sha512',
    'bootstrap-affix': 'vendor/bootstrap/bootstrap-affix',
    'bootstrap-alert': 'vendor/bootstrap/bootstrap-alert',
    'bootstrap-button': 'vendor/bootstrap/bootstrap-button',
    'bootstrap-collapse': 'vendor/bootstrap/bootstrap-collapse',
    'bootstrap-dropdown': 'vendor/bootstrap/bootstrap-dropdown',
    'bootstrap-modal': 'vendor/bootstrap/bootstrap-modal',
    'bootstrap-tooltip': 'vendor/bootstrap/bootstrap-tooltip',
    'bootstrap-popover': 'vendor/bootstrap/bootstrap-popover',
    'bootstrap-scrollspy': 'vendor/bootstrap/bootstrap-scrollspy',
    'bootstrap-tab': 'vendor/bootstrap/bootstrap-tab',
    'bootstrap-transition': 'vendor/bootstrap/bootstrap-transition',
    'bootstrap-typeahead': 'vendor/bootstrap/bootstrap-typeahead'
  }
});

require([ 'jquery'
  , 'underscore'
  , 'backbone'
  , 'spin'
  , 'crypto'
  , 'bootstrap-affix'
  , 'bootstrap-alert'
  , 'bootstrap-button'
  , 'bootstrap-collapse'
  , 'bootstrap-dropdown'
  , 'bootstrap-modal'
  , 'bootstrap-popover'
  , 'bootstrap-scrollspy'
  , 'bootstrap-tab'
  , 'bootstrap-tooltip'
  , 'bootstrap-transition'
  , 'bootstrap-typeahead'
  , 'app'
], function($, _, Backbone, Spin, Crypto, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, App) {

  App.initialize();

});