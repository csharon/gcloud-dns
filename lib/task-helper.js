var glp = require('gulp-load-plugins')({lazy: true}),
  del = require('del');

module.exports = {
  log: log,
  clean: clean
};

/**
 * Log a message or series of messages using chalk's blue color.
 * Can pass in a string, object or array.
 */
function log(msg) {
  if (typeof(msg) === 'object') {
    for (var item in msg) {
      if (msg.hasOwnProperty(item)) {
        glp.util.log(glp.util.colors.blue(msg[item]));
      }
    }
  } else {
    glp.util.log(glp.util.colors.blue(msg));
  }
}

function clean(path, done) {
  log('Cleaning: ' + path);
  return del(path, done);
}
