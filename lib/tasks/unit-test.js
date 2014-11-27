/*jshint node:true, es3:false*/

var gulp = require('gulp'),
  karmaCommonConf = require('../../karma-common-conf.js'),
  jade = require('gulp-jade'),
  ngtemplates = require('gulp-angular-templatecache'),
  karma = require('karma').server,
  config = require('../config.js'),
  del = require('del'),
  _ = require('lodash');
/**
 * Testing sub tasks
 */
gulp.task('clean:coverage', function () {
  del.sync([config.paths.coverage]);
});

gulp.task('createtesttmpls', ['clean:coverage'], function () {
  gulp.src(config.filesets.templateCache)
    .pipe(jade({pretty: true}))
    .pipe(ngtemplates('gcloud-dns.tpls.js', {module: 'xd.tmpls', root: '/', standalone: true}))
    .pipe(gulp.dest('test/spec'));
});

gulp.task('watch:testtemplates', function () {
  gulp.watch(config.filesets.templateCache, ['createtesttmpls']);
});

gulp.task('autotest', ['createtesttmpls' ], function (done) {
  karma.start(_.assign({}, karmaCommonConf), done);
});

gulp.task('test:ci', ['createtesttmpls' ], function (done) {
  karma.start(_.assign({}, karmaCommonConf, {
    singleRun: true,
    reporters: ['dots', 'junit'],
    junitReporter: {
      outputFile: 'test-results.xml'
    }
  }), done);
});

gulp.task('wstest', ['createtesttmpls' ], function (done) {
  karma.start(_.assign({}, karmaCommonConf, {
    singleRun: true,
    browswers: ['Chrome']
  }), done);
});

gulp.task('test:coverage', ['createtesttmpls' ], function () {
  karma.start(_.assign({}, karmaCommonConf, {
    singleRun: true,
    reporters: ['progress','coverage'],
    browsers: ['PhantomJS'],
    preprocessors: {
      'app/**/!(spec|*-spec|*-mock|mock|mock-data|*-mock-data).js': 'coverage'
    }
  }));
});
