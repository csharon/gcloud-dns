var gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  
  open = require('gulp-open'),
  config = require('../config.js');

/**
 * Server tasks
 */
gulp.task('open:dev', ['serve:dev'], function () {
  return gulp.src('dev/index.html')
    .pipe(open("", {url: 'http://' + config.server.HOST + ':' + config.server.PORT}))
});

gulp.task('serve:dev', ['dev:build'], function () {
  nodemon({
    script: 'srv/server.js',
    ext: 'js',
    ignore: [
      'app',
      'node_modules',
      'public',
      'test',
      'gulpfile.js',
      'karma.conf.js'
    ]})
    .on('restart', function () {
      console.log('restarted dog!');
    });
  
});

gulp.task('watch', function () {
  gulp.watch(config.filesets.sass, ['sass']);
  gulp.watch(config.filesets.templates, ['jade:index']);
  gulp.watch(config.filesets.js, ['copy:js']);
  gulp.watch(config.filesets.templateCache, ['templateCache']);
});