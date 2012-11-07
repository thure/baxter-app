var nodemailer = require('nodemailer')
  , config = require('./config')
  ;

//TODO: handle timers better using impee id.

var waiting = {}
  , callWait = {}
  , email = nodemailer.createTransport("SMTP", config.smtp);

function failedToRespond(req, res, next){
  return res.status(504).json({
    "message": "The imp didn't respond!"
  });
}

function succeededInResponding(req, res, next){
  return res.status(200).json({
    "message": "The imp has done what you asked of it."
  });
}

exports.handleResponse = function(req, res, next){
  clearTimeout(waiting.timeout);
  return succeededInResponding(waiting.req, waiting.res, waiting.next);
};

exports.waitForResponse = function(req, res, next){
  waiting.req = req; waiting.res = res; waiting.next = next;
  waiting.timeout = setTimeout(failedToRespond, 1e4, req, res, next);
};

function failedToCall(req){
  email.sendMail({
    from: config.email.from,
    to: config.email.to,
    subject: "The imp failed to phone home!",
    text: "Imp id "+ req.body.id + " failed to phone home. You should check on it."
  }, function(err, response){
    if(err) return console.log('Error sending email for failure to phone home!', err);
    return console.log("The imp failed to phone home, so I sent an email: " + response.message);
  });
}

exports.handleCall = function(req, res, next){
  clearTimeout(callWait[req.body.id]);
  callWait[req.body.id] = setTimeout(failedToCall, 6e5, req);
};