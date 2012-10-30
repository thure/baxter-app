var dbu = 'baxter'
  , dbp = 'Ghsqu2r0UoTN3JSkoCeL'
  , dburi = 'mongodb://' + dbu + ':' + dbp + '@ds041327.mongolab.com:41327/heroku_app8710643'
  ;

exports.db = {
  username: dbu,
  password: dbp,
  uri: dburi
};