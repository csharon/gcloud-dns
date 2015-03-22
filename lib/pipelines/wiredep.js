var gulp = require('gulp'),
  config = require('../gulp-config')().pipelines.wiredep,
  helpers = require('../task-helper'),
  args = require('yargs').argv,
  glp = require('gulp-load-plugins')({lazy: true});

gulp.task('clean:index', clean);
gulp.task('wiredep', ['clean:index'], createIndex);

function clean(done) {
  return helpers.clean(config.indexHtml, done);
}

function createIndex() {
  var wiredep = require('wiredep').stream,
    wiredepOpts = config.getWiredepOpts();

  return gulp
    .src(config.index)
    .pipe(glp.plumber())
    .pipe(glp.if(args.verbose, glp.print()))
    .pipe(glp.jade(config.jade.opts))
    .pipe(wiredep(wiredepOpts))
    .pipe(gulp.dest(config.output));
}
