var gulp = require('gulp'),
  jade = require('gulp-jade'),
  ngtemplates = require('gulp-angular-templatecache'),
  config = require('../config.js'),
  wiredep = require('wiredep').stream,
  plumber = require('gulp-plumber');

gulp.task('jade:index', function () {
  return gulp.src('app/index.jade')
    .pipe(plumber())
    .pipe(jade({pretty: true}))
    .pipe(wiredep({
      ignorePath: '../bower_components',
      fileTypes: {
        html: {
          replace: {
            js: '<script src="/vendor{{filePath}}"></script>',
            css: '<link rel="stylesheet" href="/vendor{{filePath}}" />'
          }
        }
      }
    }))
    .pipe(gulp.dest('dev'));
});

gulp.task('templateCache', function () {
  return gulp.src(config.filesets.templateCache)
    .pipe(plumber())
    .pipe(jade({pretty: true}))
    .pipe(ngtemplates('gcloud-dns.tpls.js', {module: 'xd.tmpls', root: '/', standalone: true}))
    .pipe(gulp.dest(config.paths.dev));
});