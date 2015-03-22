var _ = require('lodash'),
  helper = require('./task-helper'),
  bowerJson = require('../bower.json'),
  wiredep = require('wiredep');

module.exports = function () {
  var projectDir = process.env.PWD = process.cwd() + '/',
    srcDir = 'app/',
    testDir = 'app/',
    reportDir = 'reports/',
    buildDir = 'dist/',
    docDir = 'docs/',
    tempDir = '.tmp/';

  var bowerFiles = {
    dev: wiredep({devDependencies: true}).js
  };

  var filesets = {
    allJs: [
      srcDir + '*-module.js',
      srcDir + '**/*-module.js',
      srcDir + '*.js',
      srcDir + '**/*.js'
    ],
    appJS: [
      srcDir + '*-module.js',
      srcDir + '**/*-module.js',
      srcDir + '**/*.js',
      '!' + srcDir + '**/*-spec.js',
      '!' + srcDir + '**/*-mock.js',
      '!' + srcDir + '**/*-mock-data.js',
      srcDir + '*.js'
    ],
    docJs: [],
    specs: [
      testDir + '*-spec.js',
      testDir + '**/*-spec.js'
    ],
    projectJs: [
      projectDir + '*.js'
    ],
    devBowerFiles: helper.getBowerFiles({includeDev: true}),
    sass: [
      srcDir + 'assets/sass/app.sass'
    ],
    generatedCss: [
      tempDir + '**/*.css'
    ],
    indexJade: srcDir + 'index.jade',
    indexHtml: tempDir + '*.html',
    templatesJade: [
      srcDir + '**/*.jade',
      '!' + srcDir + 'index.jade'
    ],
    generatedJs: tempDir + '*.js'
  };

  var config = {
    bower: {
      json: '',
      directory: '',
      ignorePath: ''
    },
    server: {
      port: 3005,
      name: 'localhost'
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
      exclude: /.*\-(spec|mock|mock-data)\.js/,
      title: bowerJson.name + ' Instpection Report',
      output: reportDir + 'plato/'
    },
    test: {
      opts: {
        files: _.union(bowerFiles.dev, filesets.allJs, filesets.generatedJs),
        reporters: {
          dir: reportDir + 'coverage',
          reporters: [
            {type: 'html', subdir: 'report-html'},
            {type: 'lcov', subdir: 'report-lcov'},
            {type: 'text-summary'}
          ]
        },
        preprocessors: {
          'app/**/!(spec|*-spec|*-mock|mock|mock-data|*-mock-data).js': 'coverage'
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
    release: {
      files: ['./package.json', './bower.json'],
      output: projectDir
    },
    document: {
      files: filesets.allJs,
      title: bowerJson.name + ' API Docs',
      scripts: [],
      sass: [],
      output: docDir,
      server: {
        host: 'localhost',
        port: 9001,
        fallback: 'index.html'
      }
    },
    style: {
      files: filesets.sass,
      opts: {
        project: projectDir,
        css: tempDir + 'assets/css',
        sass: srcDir + 'assets/sass'
      }
    },
    serve: {
      watch: {
        js: filesets.appJS,
        sass: filesets.sass,
        indexJade: filesets.indexJade,
        templates: filesets.templatesJade
      },
      browserReloadDelay: 1000,
      browserSync: {
        proxy: config.server.name + ':' + config.server.port,
        port: 3000,
        files: filesets.appJS
          .concat(filesets.generatedCss)
          .concat(filesets.generatedJs),
        ghostMode: {
          clicks: true,
          location: true,
          forms: true,
          scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'gcloudDNS',
        notify: true,
        reloadDelay: 1000
      },
      nodeOpts: {
        script: 'srv/server.js',
        port: 3001,
        delatyTime: 1,
        watch: [
          'srv/**/*.js',
          'lib/pipelines/serve.js',
          'lib/gulp-config.js'
        ]
      }
    },
    wiredep: {
      getWiredepOpts: getWiredepOpts,
      index: filesets.indexJade,
      indexHtml: filesets.indexHtml,
      output: tempDir,
      jade: {
        opts: {
          pretty: true
        }
      }
    },
    inject: {
      index: filesets.indexHtml,
      output: tempDir,
      getInjectOpts: getInjectOpts,
      js: {
        fileset: filesets.appJS,
        opts: {}
      },
      css: {
        fileset: filesets.generatedCss,
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
        fileset: filesets.templatesJade,
        output: tempDir,
        opts: {
          read: false,
          starttag: '<!-- inject:templates:js -->',
          ignorePath: '/.tmp/'
        }
      }
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
    return pipelines.inject[key];
  }

  return {
    config: config,
    pipelines: pipelines
  };

};
