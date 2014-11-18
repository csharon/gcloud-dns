var gulp = require('gulp'),
  config = require('../config.js'),
  ngAnnotate = require('gulp-ng-annotate'),
  plumber = require('gulp-plumber'),
  ngtemplates = require('gulp-angular-templatecache'),
  merge = require('merge-stream'),
  jade = require('gulp-jade'),
  concat = require('gulp-concat'),
  sourcemaps = require('gulp-sourcemaps'),
  uglify = require('gulp-uglify'),
  gulpif = require('gulp-if'),
  ts = require('gulp-typescript');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var tsProject = ts.createProject({
  declarationFiles: true,
  noExternalResolve: true
});

gulp.task('build:js', function () {
  var templates =  gulp.src(config.filesets.templateCache)
    .pipe(plumber())
    .pipe(jade({pretty: true}))
    .pipe(ngtemplates('gcloud-dns.tpls.js', {module: 'xd.tmpls', root: '/', standalone: true}));

  var tsFiles = gulp.src('app/vo/*.ts')
    .pipe(ts(tsProject));

  var jsFiles = gulp.src(config.filesets.js);

  return merge(tsFiles, templates, jsFiles)
    .pipe(ngAnnotate())
    .pipe(sourcemaps.init())
    .pipe(concat('gcloud-dns.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.paths.dev));
});
