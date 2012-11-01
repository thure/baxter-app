require.config({
  shim: {
  },

  paths: {
    jquery: 'vendor/jquery.min'
  }
});
 
require(['app', 'jquery'], function(app, $) {
  // use app here
  $('body').append('<h1>Welcome to Baxter.</h1>');
  console.log(app);
});