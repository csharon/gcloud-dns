/*jshint node:true, es3:false*/
var express = require('express'),
    passport = require('passport'),
    logger = require('morgan'),
    methodOverride = require('method-override'),
    expressSession = require('express-session'),
    _ = require('lodash');

module.exports = function (app, config) {

  app.use(logger('dev'));
  app.use(methodOverride());

  app.use(expressSession({
    secret: 'do you like beff',
    resave: true,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  _.each(config.webRoot, function (path) {
    app.use(express.static(path));
  });

};
