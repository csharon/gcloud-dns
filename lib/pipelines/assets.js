var gulp = require('gulp'),
  config = require('../gulp-config')().pipelines.assets,
  helpers = require('../task-helper');

gulp.task('clean:temp:fonts', cleanFonts);
gulp.task('temp:fonts', ['clean:temp:fonts'], copyFonts);

function cleanFonts(done) {
  return helpers.clean(config.dest.fonts, done);
}

function copyFonts() {
  return gulp
    .src(config.src.fonts)
    .pipe(gulp.dest(config.dest.fonts));
}
