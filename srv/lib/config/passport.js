/*jshint node:true, es3:false*/
var passport = require('passport'),
  GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function (config) {

  passport.serializeUser(function(user, done) {
    console.log('user: ' + user);
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

  passport.use(new GoogleStrategy({
      clientID: config.google.clientID,
      clientSecret: config.google.clientSecret,
      callbackURL: config.google.callbackURL
    },
    function (accessToken, refreshToken, profile, done) {
      console.log('accessToken: ' + accessToken);
      var resp = {token: accessToken, profile: profile};
      process.nextTick(function () {
        return done(null, resp);
      });
    }
  ));

};