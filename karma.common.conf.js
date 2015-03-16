var config = require('./lib/gulp-config')().pipelines.test;

module.exports = {
  basePath: '',

  // frameworks to use
  // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
  frameworks: ['mocha', 'chai', 'sinon-chai'],

  // list of files / patterns to load in the browser
  files: config.opts.files,

  // list of files to exclude
  exclude: [],

  // test results reporter to use
  // possible values: 'dots', 'progress'
  // available reporters: https://npmjs.org/browse/keyword/karma-reporter
  reporters: ['mocha', 'coverage'],

  coverageReporter: config.opts.reporters,

  preprocessors: config.opts.preprocessors,

  // web server port
  port: 9876,

  // enable / disable colors in the output (reporters and logs)
  colors: true,

  // level of logging
  // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
  logLevel: 'WARN',

  // Continuous Integration mode
  // if true, Karma captures browsers, runs the tests and exits
  singleRun: false,

  // start these browsers
  // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
  browsers: ['PhantomJS'],
  plugins: [
    'karma-mocha',
    'karma-chai',
    'karma-sinon-chai',
    'karma-phantomjs-launcher',
    'karma-mocha-reporter',
    'karma-coverage',
    'karma-chrome-launcher'
  ]
};
