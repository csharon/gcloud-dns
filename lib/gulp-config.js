var _ = require('lodash'),
  helper = require('./task-helper'),
  bowerJson = require('../bower.json');

module.exports = function () {
  var projectDir = process.env.PWD = process.cwd() + '/',
    srcDir = 'app/',
    testDir = 'app/',
    reportDir = 'reports/',
    buildDir = 'dist/',
    docDir = 'docs/',
    tempDir = '.tmp/';

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

  var config = {
    bower: {
      json: '',
      directory: '',
      ignorePath: ''
    }
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
    },
    style: {
      files: srcDir + 'assets/sass/app.sass',
      opts: {
        project: projectDir,
        css: tempDir + 'assets/css',
        sass: srcDir + 'assets/sass'
      }
    },
    html: {
      index: srcDir + 'index.jade',
      output: tempDir,
      outputFiles: tempDir + '*.html',
      jade: {
        opts: {
          pretty: true
        }
      },
      inject: {
        js: {
          fileset: [
            srcDir + '*-module.js',
            srcDir + '**/*-module.js',
            srcDir + '**/*.js',
            '!' + srcDir + '**/*-spec.js',
            '!' + srcDir + '**/*-mock.js',
            '!' + srcDir + '**/*-mock-data.js',
            srcDir + '*.js'
          ],
          opts: {}
        },
        css: {
          fileset: tempDir + '**/*.css',
          opts: {
            ignorePath: ['/.tmp/']
          }
        },
        templates: {
          templateCache: {
            file: 'gcloud-dns.tpls.js',
            opts: {
              module: 'xd.tmpls',
              root: '/',
              standalone: true
            }
          },
          fileset: [
            srcDir + '**/*.jade',
            '!' + srcDir + 'index.jade'
          ],
          output: tempDir,
          opts: {
            read: false,
            starttag: '<!-- inject:templates:js -->',
            ignorePath: '/.tmp/'
          }
        }
      },
      getWiredepOpts: getWiredepOpts,
      getInjectOpts: getInjectOpts
    }
  };

  function getWiredepOpts() {
    var opts = {
      bowerJson: config.bower.json,
      directory: config.bower.directory,
      ignorePath: config.bower.ignorePath
    };

    return opts;
  }

  function getInjectOpts(key) {
    return pipelines.html.inject[key];
  }

  return {
    config: config,
    pipelines: pipelines
  };

};
