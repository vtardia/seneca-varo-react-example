var source = require('vinyl-source-stream');
var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var notify = require('gulp-notify');

// Required for uglify/rename
// var uglify = require('gulp-uglify');
// var rename = require('gulp-rename');
// var buffer = require('vinyl-buffer');

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}

function buildScript(file, watch) {

  var props = {
    entries: ['./src/' + file],
    debug : true,
    transform:  [babelify.configure({stage:0})]
  };

  // watchify() if watch requested, otherwise run browserify() once
  var bundler = watch ? watchify(browserify(props)) : browserify(props);

  function rebundle() {
    var stream = bundler.bundle();
    return stream
      .on('error', handleErrors)
      .pipe(source(file))
      .pipe(gulp.dest('./public/js/'));
      // If you also want to uglify it
      // .pipe(buffer())
      // .pipe(uglify())
      // .pipe(rename('app.min.js'))
      // .pipe(gulp.dest('./build'))
      //.pipe(reload({stream:true}));
  }

  // listen for an update and run rebundle
  bundler.on('update', function() {
    rebundle();
    gutil.log('Rebundle...');
  });

  // run it once the first time buildScript is called
  return rebundle();
}

gulp.task('build', function() {
  return buildScript('main.js', false); // this will once run once because we set watch to false
});

gulp.task('watch', ['build'], function() {
  return buildScript('main.js', true); // browserify watch for JS changes
});

// run 'scripts' task first, then watch for future changes
gulp.task('default', ['watch']);
