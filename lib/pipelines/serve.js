var gulp = require('gulp'),
  config = require('../gulp-config')().pipelines.serve,
  helpers = require('../task-helper'),
  browserSync = require('browser-sync'),
  args = require('yargs').argv,
  glp = require('gulp-load-plugins')({lazy: true});

gulp.task('serve', ['build:index'], serve);

function serve() {

  return glp.nodemon(config.nodeOpts)
    .on('restart', onRestart)
    .on('start', onStart)
    .on('crash', onCrash)
    .on('exit', onExit);
}

function onRestart(e) {
  helpers.log('Nodemon restarted.');
  helpers.log('files changed: ' + e);
  setTimeout(function () {
    browserSync.notify('reloading now ...');
    browserSync.reload({stream: false});
  }, config.browserReloadDelay);
}

function onStart() {
  helpers.log('Nodemon started.');
  gulp.watch(config.watch.sass, ['styles'])
    .on('change', onChange);
  gulp.watch(config.watch.indexJade, ['build:index'])
    .on('change', onChange);
  gulp.watch(config.watch.templates, ['build:index'])
    .on('change', onChange);
  startBrowserSync();
}

function onChange(e) {

  helpers.log('File ' + e.path + ' ' + e.type);
}

function onCrash() {
  helpers.log('Nodemon crashed.');
}

function onExit() {
  helpers.log('Nodemon exited.');
}

function startBrowserSync() {
  if (browserSync.active) {
    return;
  }
  helpers.log('starting browser sync on port ' + config.browserSync.port);
  browserSync(config.browserSync);
}
