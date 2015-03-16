/* jshint node: true */
var config = require('../gulp-config')().pipelines.validate,
  args = require('yargs').argv,
  helpers = require('../task-helper'),
  gulp = require('gulp'),
  glp = require('gulp-load-plugins')({lazy: true});

gulp.task('lint', runLint);
gulp.task('jscs', runJscs);
gulp.task('validate', vetJs);

function runLint() {
  helpers.log('Analyzing source with JSHint');
  return gulp
    .src(config.files)
    .pipe(glp.if(args.verbose, glp.print()))
    .pipe(glp.jshint())
    .pipe(glp.jshint.reporter('jshint-stylish', {verbose: true}))
    .pipe(glp.jshint.reporter('fail'));
}

function runJscs() {
  helpers.log('Analyzing source with JSCS');
  return gulp
    .src(config.files)
    .pipe(glp.if(args.verbose, glp.print()))
    .pipe(glp.jscs());
}

function vetJs() {
  helpers.log('Analyzing source with JSHint and JSCS');
  return gulp
    .src(config.files)
    .pipe(glp.if(args.verbose, glp.print()))
    .pipe(glp.jscs())
    .pipe(glp.jshint())
    .pipe(glp.jshint.reporter('jshint-stylish', {verbose: true}))
    .pipe(glp.jshint.reporter('fail'));
}
