var gulp = require('gulp'),
  config = require('../gulp-config')().pipelines.document,
  glp = require('gulp-load-plugins')({lazy: true}),
  helpers = require('../task-helper');

gulp.task('clean:docs', function (done) {
  return helpers.clean(config.output, done);
});

gulp.task('ngdocs', ['clean:docs', 'build'], function () {
  return gulp.src(config.files)
    .pipe(glp.plumber())
    .pipe(glp.ngdocs.process({
      scripts: config.scripts,
      sass: config.sass,
      html5Mode: true,
      startPage: '/api',
      titleLink: '/api',
      title: config.title
    }))
    .pipe(gulp.dest(config.output));
});

gulp.task('serve:docs', ['ngdocs'], function () {

  return gulp.src('docs')
    .pipe(glp.webserver({
      livereload: true,
      host: config.server.host,
      port: config.server.port,
      fallback: config.server.fallback,
      open: true
    }));
});

gulp.task('watch:docs', function () {
  gulp.watch(config.files, ['ngdocs']);
});

gulp.task('docs', ['serve:docs', 'watch:docs']);
