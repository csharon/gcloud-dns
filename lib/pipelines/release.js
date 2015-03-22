var gulp = require('gulp'),
  config = require('../gulp-config')().pipelines.release,
  glp = require('gulp-load-plugins')({lazy: true});

gulp.task('patch', function() { return release('patch'); });
gulp.task('minor', function() { return release('minor'); });
gulp.task('major', function() { return release('major'); });

function release(importance) {
  // get all the files to bump version in
  return gulp.src(config.files)
    // bump the version number in those files
    .pipe(glp.bump({type: importance}))
    // save it back to filesystem
    .pipe(gulp.dest(config.output))
    // commit the changed version number
    .pipe(glp.git.commit('bumps package version'))

    // read only one file to get the version number
    .pipe(glp.filter('package.json'))
    // **tag it in the repository**
    .pipe(glp.tagVersion({prefix: ''}));
}
