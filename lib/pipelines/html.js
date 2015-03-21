var gulp = require('gulp'),
  config = require('../gulp-config')().pipelines.html,
  helpers = require('../task-helper'),
  args = require('yargs').argv,
  glp = require('gulp-load-plugins')({lazy: true});

gulp.task('clean:index', clean);
gulp.task('build:index', ['clean:index'], buildIndex);

function clean(done) {
  return helpers.clean(config.outputFiles, done);
}

function buildIndex() {
  var wiredepOpts = config.getWiredepOpts(),
    jsInjectOpts = config.getInjectOpts('js'),
    cssInjectOpts = config.getInjectOpts('css'),
    tcInjectOpts = config.getInjectOpts('templates'),
    wiredep = require('wiredep').stream;

  return gulp
    .src(config.index)
    .pipe(glp.plumber())
    .pipe(glp.jade(config.jade.opts))
    .pipe(wiredep(wiredepOpts))
    .pipe(glp.if(args.verbose, glp.print()))
    .pipe(glp.inject(
      gulp.src(jsInjectOpts.fileset)
        .pipe(glp.angularFilesort()), jsInjectOpts.opts))
    .pipe(glp.inject(gulp.src(cssInjectOpts.fileset), cssInjectOpts.opts))
    .pipe(glp.inject(
      gulp.src(tcInjectOpts.fileset)
        .pipe(glp.jade())
        .pipe(glp.minifyHtml({empty: true}))
        .pipe(glp.angularTemplatecache(
          tcInjectOpts.templateCache.file,
          tcInjectOpts.templateCache.opts
        ))
        .pipe(gulp.dest(tcInjectOpts.output)), tcInjectOpts.opts))
    .pipe(gulp.dest(config.output));
}
