var dbu = 'baxter'
  , dbp = 'dbpass'
  , dburi = 'mongodb://' + dbu + ':' + dbp + '@sub.domain.tld:port/endpoint'
  ;

exports.db = {
  username: dbu,
  password: dbp,
  uri: dburi
};