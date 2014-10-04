var gulp = require('gulp'),
  compass = require('gulp-compass'),
  config = require('../config.js'),
  plumber = require('gulp-plumber');

gulp.task('sass', function () {
  return gulp.src(config.sassFile)
    .pipe(plumber())
    .pipe(compass({
      project: config.paths.root,
      css: 'dev',
      sass: 'app'
    }));
});
