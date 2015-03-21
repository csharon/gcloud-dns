var gulp = require('gulp'),
  config = require('../gulp-config')().pipelines.style,
  helpers = require('../task-helper'),
  args = require('yargs').argv,
  glp = require('gulp-load-plugins')({lazy: true});

gulp.task('clean:styles', cleanStyles);
gulp.task('styles', ['clean:styles'], compileStyles);

function cleanStyles(done) {
  return helpers.clean(config.opts.css, done);
}

function compileStyles() {
  helpers.log('Compiling Sass --> CSS');
  return gulp
    .src(config.files)
    .pipe(glp.if(args.verbose, glp.print()))
    .pipe(glp.plumber())
    .pipe(glp.compass(config.opts))
    .pipe(glp.autoprefixer({browser: ['last 2 version', '> 5%']}))
    .pipe(gulp.dest(config.opts.css));
}
