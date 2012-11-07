define([
  'jquery',
  'underscore'
], function($, _){

  return {

    domain: document.location.protocol + '//' + document.location.host + '/',

    request: function(opt){
      var domain = document.location.protocol + '//' + document.location.host + '/';

      return $.ajax({
        url: domain + opt.endpoint,
        type: opt.method,
        contentType: opt.contentType ? opt.contentType : opt.payload ? 'application/json' : undefined,
        data: opt.payload ? JSON.stringify(opt.payload): undefined
      });
    }

  };

});