/*jshint node:true, es3:false*/
var passport = require('passport');

module.exports = function (app, config) {

  app.route('/auth/google')
    .get(passport.authenticate('google', {scope: config.google.scope, response_type: 'token', include_granted_scopes: true}));

  app.route('/oauth2callback')
    .get(passport.authenticate('google', { failureRedirect: '/'}),
    function (req, res) {
      res.redirect('/');
    }
  );

  app.route('/api/profile')
    .get(function (req, res) {
      if (req.user) {
        res.json(req.user);
      } else {
        res.send(401);
      }
    });

  app.route('/api/session')
    .delete(function (req, res) {
      req.logout();
      res.send(200);
    });

/*
  app.get('*', function (req, res) {
    res.render('index');
  });
*/

  app.get('*', function (req, res) {
    res.sendFile(config.webRoot.concat('/index.html'));
  });
};