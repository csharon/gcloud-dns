var gulp = require('gulp'),
  requireDir = require('require-dir'),
  glp = require('gulp-load-plugins')({lazy: true});

requireDir('./lib/pipelines', {recurse: true});

gulp.task('help', glp.taskListing);
gulp.task('default', ['help']);

gulp.task('verify', ['validate', 'test']);
gulp.task('dev', ['serve']);
