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
  gulpif = require('gulp-if');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

gulp.task('build:js', function () {
  var templates =  gulp.src(config.filesets.templateCache)
    .pipe(plumber())
    .pipe(jade({pretty: true}))
    .pipe(ngtemplates('gcloud-dns.tpls.js', {module: 'xd.tmpls', root: '/', standalone: true}));

  var jsFiles = gulp.src(config.filesets.js);

  return merge(templates, jsFiles)
    .pipe(ngAnnotate())
    .pipe(sourcemaps.init())
    .pipe(concat('gcloud-dns.js'))
    //.pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.paths.dev));
});
