var _ = require('lodash'),
  helper = require('./task-helper'),
  bowerJson = require('../bower.json');

module.exports = function () {
  var projectDir = process.env.PWD = process.cwd() + '/',
    srcDir = 'app/',
    testDir = 'app/',
    reportDir = 'reports/',
    buildDir = 'dist/',
    docDir = 'docs/';

  var filesets = {
    allJs: [
      srcDir + '*-module.js',
      srcDir + '**/*-module.js',
      srcDir + '*.js',
      srcDir + '**/*.js'
    ],
    appJs: [
      srcDir + '*-module.js',
      srcDir + '**/*-module.js',
      srcDir + '*[^(-spec|-mock|-mock-data)].js',
      srcDir + '**/*[^(spec|mock|mock-data)].js'
    ],
    docJs: [],
    specs: [
      testDir + '*-spec.js',
      testDir + '**/*-spec.js'
    ],
    projectJs: [
      projectDir + '*.js'
    ],
    devBowerFiles: helper.getBowerFiles({includeDev: true})
  };

  var pipelines = {
    validate: {
      files: _.union(filesets.allJs, filesets.specs, filesets.projectJs)
    },
    analyze: {
      server: {
        host: 'localhost',
        port: 9003,
        fallback: 'index.html'
      },
      files: 'app/**/*.js',
      exclude: /.*\.spec|mock|mock-data\.js/,
      title: bowerJson.name + ' Instpection Report',
      output: reportDir + 'plato/'
    },
    test: {
      opts: {
        files: _.union(filesets.devBowerFiles, filesets.allJs),
        reporters: {
          dir: reportDir + 'coverage',
          reporters: [
            {type: 'html', subdir: 'report-html'},
            {type: 'lcov', subdir: 'report-lcov'},
            {type: 'text-summary'}
          ]
        },
        preprocessors: {
          'src/**/!(spec|*-spec|*-mock|mock|mock-data|*-mock-data).js': 'coverage'
        }
      },
      tdd: {},
      debug: {
        browsers: ['Chrome']
      },
      ci: {
        singleRun: true,
        junitReporter: {
          outputFile: 'test-results.xml'
        }
      },
      server: {
        host: 'localhost',
        port: 9002,
        fallback: 'index.html'
      }
    },
    package: {
      pkgName: bowerJson.name,
      files: filesets.appJs,
      output: buildDir
    },
    release: {
      files: ['./package.json', './bower.json'],
      output: projectDir
    },
    document: {
      files: filesets.allJs,
      title: bowerJson.name + ' API Docs',
      scripts: [],
      styles: [],
      output: docDir,
      server: {
        host: 'localhost',
        port: 9001,
        fallback: 'index.html'
      }
    }
  };

  return {
    pipelines: pipelines
  };

};
