var _ = require('lodash'),
  bowerJson = require('../bower.json'),
  wiredep = require('wiredep');

module.exports = function () {
  var projectDir = process.env.PWD = process.cwd() + '/',
    srcDir = 'app/',
    testDir = 'app/',
    reportDir = 'reports/',
    docDir = 'docs/',
    tempDir = '.tmp/';

  var bowerFiles = {
    dev: wiredep({devDependencies: true}).js,
    depends: wiredep().js
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
    },
    templateCache: {
      fileset: filesets.templatesJade,
      file: 'gcloud-dns.tpls.js',
      output: tempDir,
      opts: {
        module: 'xd.tmpls',
        root: '/',
        standalone: true
      }
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
      opts: {
        scripts: filesets.generatedJs,
        styles: filesets.generatedCss,
        html5Mode: true,
        startPage: '/api',
        titleLink: '/api',
        title: bowerJson.name + ' API Docs'
      },
      templateCache: config.templateCache,
      files: filesets.appJS,
      output: docDir,
      serverOpts: {
        livereload: true,
        host: 'localhost',
        port: 9001,
        fallback: 'index.html',
        open: true
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
        templateCache: config.templateCache,
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
