var gulp = require('gulp'),
  config = require('../gulp-config')().pipelines.production,
  helpers = require('../task-helper'),
  args = require('yargs').argv,
  glp = require('gulp-load-plugins')({lazy: true});

gulp.task('clean:fonts', cleanFonts);
gulp.task('clean:images', cleanImages);
gulp.task('fonts', ['clean:fonts'], copyFonts);
gulp.task('compress:images', ['clean:images'], compressImages);
gulp.task('optimize', ['clean:build', 'inject', 'fonts', 'compress:images'], optimize);
gulp.task('clean:build', cleanBuild);

function cleanFonts(done) {
  return helpers.clean(config.dest.fonts, done);
}

function cleanImages(done) {
  return helpers.clean(config.dest.images, done);
}

function copyFonts() {
  return gulp
    .src(config.src.fonts)
    .pipe(gulp.dest(config.dest.fonts));
}

function cleanBuild(done) {
  return helpers.clean(config.dest.build, done);
}

function compressImages() {
  helpers.log('Compressing images.');
  return gulp
    .src(config.src.images)
    .pipe(glp.imagemin({optimizationLevel: 4}))
    .pipe(gulp.dest(config.dest.images));
}

function optimize() {
  helpers.log('Creating optimized index.html');
  helpers.log(process.cwd());
  var htmlAssets = glp.useref.assets(config.userefOpts);
  var cssFilter = glp.filter('assets/css/*.css');
  var jsLibFilter = glp.filter(['scripts/vendor.js']);
  var jsAppFilter = glp.filter(['scripts/app.js']);

  return gulp
    .src(config.index)
    .pipe(glp.plumber())
    .pipe(glp.if(args.verbose, glp.print()))
    .pipe(htmlAssets)
    .pipe(cssFilter)
    .pipe(glp.csso())
    .pipe(cssFilter.restore())
    .pipe(jsLibFilter)
    .pipe(glp.uglify())
    .pipe(jsLibFilter.restore())
    .pipe(jsAppFilter)
    .pipe(glp.if(args.verbose, glp.print()))
    .pipe(glp.ngAnnotate())
    .pipe(glp.uglify())
    .pipe(jsAppFilter.restore())
    .pipe(glp.rev())
    .pipe(htmlAssets.restore())
    .pipe(glp.useref())
    .pipe(glp.revReplace())
    .pipe(gulp.dest(config.build))
    .pipe(glp.rev.manifest())
    .pipe(gulp.dest(config.build));
}
