var config = require('../gulp-config')().pipelines.analyze,
  args = require('yargs').argv,
  _ = require('lodash'),
  utils = require('../task-helper'),
  webserver = require('gulp-webserver'),
  glob = require('glob'),
  gulp = require('gulp'),
  plato = require('plato');

/**
 * Create a visualizer report
 */
gulp.task('plato:generate', function(done) {
  utils.log('Analyzing source with Plato');
  utils.log('Browse to /report/plato/index.html to see Plato results');

  startPlatoVisualizer(done);
});

gulp.task('plato', ['plato:generate'], function () {

  return gulp.src(config.output)
    .pipe(webserver({
      host: config.server.host,
      port: config.server.port,
      fallback: config.server.fallback,
      open: true
    }));
});

/**
 * Start Plato inspector and visualizer
 */
function startPlatoVisualizer(done) {
  utils.log('Running Plato');

  var files = glob.sync(config.files);
  var excludeFiles = config.exclude;
  var jsHintRc = JSON.parse(require('fs').readFileSync(require.resolve('../../.jshintrc'), 'utf8'));
  var options = {
    title: config.title,
    exclude: excludeFiles,
    jshint: {
      options: _.omit(jsHintRc, 'globals'),
      globals: jsHintRc.globals
    }
  };

  plato.inspect(files, config.output, options, platoCompleted);

  function platoCompleted(report) {
    var overview = plato.getOverviewReport(report);
    if (args.verbose) {
      utils.log(overview.summary);
    }
    if (done) { done(); }
  }
}
