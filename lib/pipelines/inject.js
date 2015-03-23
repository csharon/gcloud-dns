var gulp = require('gulp'),
  config = require('../gulp-config')().pipelines.inject,
  helpers = require('../task-helper'),
  args = require('yargs').argv,
  glp = require('gulp-load-plugins')({lazy: true});

gulp.task('inject:js', injectJs);
gulp.task('inject:css', injectCss);
gulp.task('inject:tpls', injectTpls);
gulp.task('inject:scripts', ['wiredep', 'styles'], injectJs);
gulp.task('inject:styles', ['inject:scripts'], injectCss);
gulp.task('inject', ['inject:styles'], injectTpls);

function injectJs() {
  var jsInjectOpts = config.getInjectOpts('js');
  helpers.log('Injecting JS ...');
  return gulp
    .src(config.index)
    .pipe(glp.plumber())
    .pipe(glp.if(args.verbose, glp.print()))
    .pipe(glp.inject(
      gulp.src(jsInjectOpts.fileset)
        .pipe(glp.angularFilesort()), jsInjectOpts.opts))
    .pipe(gulp.dest(config.output));
}

function injectCss() {
  var cssInjectOpts = config.getInjectOpts('css');
  helpers.log('Injecting CSS ...');
  return gulp
    .src(config.index)
    .pipe(glp.plumber())
    .pipe(glp.if(args.verbose, glp.print()))
    .pipe(glp.inject(gulp.src(cssInjectOpts.fileset), cssInjectOpts.opts))
    .pipe(gulp.dest(config.output));
}

function injectTpls() {
  var tcInjectOpts = config.getInjectOpts('templates');
  helpers.log('Injecting Templates ...');
  return gulp
    .src(config.index)
    .pipe(glp.plumber())
    .pipe(glp.if(args.verbose, glp.print()))
    .pipe(glp.inject(
      gulp.src(tcInjectOpts.templateCache.fileset)
        .pipe(glp.jade())
        .pipe(glp.minifyHtml({empty: true}))
        .pipe(glp.angularTemplatecache(
          tcInjectOpts.templateCache.file,
          tcInjectOpts.templateCache.opts
        ))
        .pipe(gulp.dest(tcInjectOpts.templateCache.output)), tcInjectOpts.opts))
    .pipe(gulp.dest(config.output));
}
