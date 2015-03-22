var gulp = require('gulp'),
  config = require('../gulp-config')().pipelines.package,
  helpers = require('../task-helper'),
  args = require('yargs').argv,
  glp = require('gulp-load-plugins')({lazy: true});

gulp.task('package', ['clean:package', 'verify'], packageJs);
gulp.task('clean:package', clean);

function packageJs() {

  return gulp
    .src(config.files)
    .pipe(glp.if(args.verbose, glp.print()))
    .pipe(glp.plumber())
    .pipe(glp.ngAnnotate())
    .pipe(glp.sourcemaps.init())
    .pipe(glp.concat(config.pkgName.concat('.js')))
    .pipe(glp.sourcemaps.write())
    .pipe(gulp.dest(config.output))
    .pipe(glp.sourcemaps.init())
    .pipe(glp.uglify())
    .pipe(glp.sourcemaps.write())
    .pipe(glp.rename(config.pkgName.concat('.min.js')))
    .pipe(gulp.dest(config.output));
}

function clean(done) {
  return helpers.clean(config.output, done);
}
