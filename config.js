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
  host: "smpt.host.com", // hostname
  secureConnection: true, // use SSL
  port: 465, // port for secure SMTP
  auth: {
    user: "baxter@host.com",
    pass: "password"
  }
};

exports.email = {
  from: "Baxter <baxter@host.com>",
  to: "you@yourhost.com"
};