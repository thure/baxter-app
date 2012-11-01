define([
  'jquery',
  'underscore'
], function($, _){

  return {

    domain: document.location.href,

    request: function(opt){
      var domain = document.location.href;

      return $.ajax({
        url: domain + opt.endpoint,
        type: opt.method,
        contentType: opt.contentType ? opt.contentType : opt.payload ? 'application/json' : undefined,
        data: opt.payload ? JSON.stringify(opt.payload): undefined
      });
    }

  };

});