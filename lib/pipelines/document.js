var gulp = require('gulp'),
  config = require('../gulp-config')().pipelines.document,
  glp = require('gulp-load-plugins')({lazy: true}),
  args = require('yargs').argv,
  helpers = require('../task-helper');

gulp.task('clean:docs', function (done) {
  return helpers.clean(config.output, done);
});

gulp.task('doc:templateCache', createTemplateCache);

gulp.task('ngdocs', ['clean:docs', 'styles', 'doc:templateCache'], function () {
  return gulp.src(config.files)
    .pipe(glp.plumber())
    .pipe(glp.if(args.verbose, glp.print()))
    .pipe(glp.ngdocs.process(config.opts))
    .pipe(gulp.dest(config.output));
});

gulp.task('serve:docs', ['ngdocs'], function () {

  return gulp.src('docs')
    .pipe(glp.webserver(config.serverOpts));
});

gulp.task('watch:docs', function () {
  gulp.watch(config.files, ['ngdocs']);
});

gulp.task('docs', ['serve:docs']);

function createTemplateCache() {

  return gulp
    .src(config.templateCache.fileset)
      .pipe(glp.jade())
      .pipe(glp.minifyHtml({empty: true}))
      .pipe(glp.angularTemplatecache(
        config.templateCache.file,
        config.templateCache.opts
      ))
      .pipe(gulp.dest(config.templateCache.output));

}
