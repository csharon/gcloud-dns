var gulp = require('gulp'),
  config = require('../config.js'),
  bowerFiles = require('main-bower-files');

gulp.task('copy:assets', function () {
  return gulp.src(config.filesets.assets)
    .pipe(gulp.dest(config.paths.dev));
});

gulp.task('copy:vendor', function () {
  return gulp.src(bowerFiles(), {base: 'bower_components'})
    .pipe(gulp.dest(config.paths.vendor_dev));
});
