var dbu = 'baxter'
  , dbp = 'password'
  , dburi = 'mongodb://' + dbu + ':' + dbp + '@sub.domain.tld:port/path'
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