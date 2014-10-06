var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  open = require('gulp-open'),
  config = require('../config.js')
  livereload = require('gulp-livereload');

/**
 * Server tasks
 */
gulp.task('open:dev', ['serve:dev'], function () {
  return gulp.src('dev/index.html')
    .pipe(open("", {url: 'http://' + config.server.HOST + ':' + config.server.PORT}))
});

gulp.task('serve:dev', ['dev:build'], function () {
  return nodemon({
    script: 'srv/server.js',
    ext: 'js',
    ignore: [
      'app',
      'dev',
      'node_modules',
      'test',
      'gulpfile.js',
      'karma.conf.js'
    ]})
    .on('start', 'watch')
    .on('restart', function () {
      console.log('restarted dog!');
    });
  
});

gulp.task('watch', function () {
  livereload.listen();
  gulp.watch(config.filesets.sass, ['sass', 'reload']);
  gulp.watch(config.filesets.templates, ['jade:index', 'reload']);
  gulp.watch(config.filesets.js, ['build:js', 'reload']);
  gulp.watch(config.filesets.templateCache, ['build:js', 'reload']);
});

gulp.task('reload', function () {
  setTimeout(function () {
    livereload.changed();
  }, 500);

});