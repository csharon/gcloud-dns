/*jshint node:true, es3:false*/
var express = require('express'),
    passport = require('passport'),
    logger = require('morgan'),
    methodOverride = require('method-override'),
    expressSession = require('express-session');

var environment = process.env.NODE_ENV;

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
  //app.use(express.static(config.webRoot));
  if (environment === 'development') {
    app.use(express.static('./app/'));
    app.use(express.static('./'));
    app.use(express.static('./.tmp/'));
  }

};
