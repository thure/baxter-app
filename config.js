var dbu = 'baxter'
  , dbp = 'Ghsqu2r0UoTN3JSkoCeL'
  , dburi = 'mongodb://' + dbu + ':' + dbp + '@alex.mongohq.com:10063/app8710643'
  ;

exports.db = {
  username: dbu,
  password: dbp,
  uri: dburi
};

exports.smtp = {
  host: "mail.willshown.com", // hostname
  secureConnection: true, // use SSL
  port: 465, // port for secure SMTP
  auth: {
    user: "baxter+willshown.com",
    pass: "7Umfd4zMAm2qB3tGddqGbH3U"
  }
};

exports.email = {
  from: "Baxter <baxter@willshown.com>",
  to: "w@willshown.com"
};