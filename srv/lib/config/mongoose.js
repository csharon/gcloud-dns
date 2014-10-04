/*jshint node:true, es3:false*/
var mongoose = require('mongoose'),
    crypto = require('crypto');

module.exports = function (config) {
  mongoose.connect(config.db);

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error...'));
  db.once('open', function () {
    console.log('gcloud db opened');
  });

  var  userSchema = mongoose.Schema({
    fname: String,
    lname: String,
    username: String,
    salt: String,
    hashedPwd: String,
    roles: [String]
  });

  userSchema.methods = {
    authenticate: function (pwdToMatch) {
      return hashPwd(this.salt, pwdToMatch) === this.hashedPwd;
    }
  };

  function createSalt() {
    return crypto.randomBytes(128).toString('base64');
  }

  function hashPwd(salt, pwd) {
    var hmac = crypto.createHmac('sha1', salt);
    return hmac.update(pwd).digest('hex');
  }
};