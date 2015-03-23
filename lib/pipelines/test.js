/*jshint node:true, es3:false*/

var gulp = require('gulp'),
  config = require('../gulp-config')().pipelines.test,
  helpers = require('../task-helper'),
  karmaCommonConf = require('../../karma.common.conf.js'),
  karma = require('karma').server,
  webserver = require('gulp-webserver'),
  _ = require('lodash');

/**
 * Testing sub tasks
 */

gulp.task('clean:coverage', function (done) {
  return helpers.clean(config.opts.reporters.dir, done);
});

gulp.task('tdd', ['inject:tpls'], function (done) {
  karma.start(_.assign({}, karmaCommonConf), done);
});

gulp.task('test', ['clean:coverage', 'inject:tpls'], function (done) {
  karma.start(_.assign({}, karmaCommonConf, config.ci),
    function () {
      done();
    });
});

gulp.task('tdd:debug', function (done) {
  karma.start(_.assign({}, karmaCommonConf, config.debug), done);
});

gulp.task('coverage', ['test'], function () {

  return gulp.src(config.opts.reporters.dir.concat('/report-html'))
    .pipe(webserver({
      host: config.server.host,
      port: config.server.port,
      fallback: config.server.fallback,
      open: true
    }));
});
