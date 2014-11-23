var rootPath = process.env.PWD = process.cwd();
var filesets = {
  templateCache: ['app/**/*.jade', '!app/index.jade', '!app/partials/**'],
  templates: ['app/index.jade', 'app/partials/*.jade'],
  js: ['app/**/*.js', '!app/**/*-spec.js', '!app/**/*-mock.js'],
  jsall: ['app/**/*.js', '!app/**/*-mock-data.js'],
  sass: ['app/**/*.sass'],
  dev: 'dev/**',
  assets: 'app/**/*.+(png|svg|jpg|gif)',
  minified: ['app/**/*.js', '!app/**/*-spec.js', 'public/*.tpls.js']
};

var paths = {
  root: rootPath,
  app: rootPath.concat('/app/'),
  dev: rootPath.concat('/dev/'),
  vendor_dev: rootPath.concat('/dev/vendor/'),
  prod: rootPath.concat('/public/'),
  docs: rootPath.concat('/docs/'),
  coverage: rootPath.concat('/coverage'),
  tmp: rootPath.concat('/tmp')
};

module.exports = {
  filesets: filesets,
  paths: paths,
  sassFile: paths.app.concat('app.sass'),
  server: {
    HOST: 'localhost',
    PORT: 3000,
    DOCS_PORT: 3001
  }
};
