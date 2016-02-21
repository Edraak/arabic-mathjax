var gulp = require('gulp');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var order = require('gulp-order');
var map = require('map-stream');


gulp.task('browser-sync', function () {
  browserSync({
    port: process.env.PORT || 3000,
    server: {
      baseDir: '/code/'
    }
  });
});


gulp.task('bs-reload', function () {
  browserSync.reload();
});


gulp.task('scripts', function () {
  return gulp.src('/code/extensions/arabic/unpacked/**/*.js')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
      }
    }))
    .pipe(order([
      'license.js',
      '**/*.js'
    ]))
    .pipe(concat('arabic.js'))
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(map(function (file, cb) {
      if (!file.jshint.success) {
        console.error('jshint failed');
        process.exit(1);
      }
    }))
    .pipe(uglify({
      preserveComments: 'some'
    }))
    .pipe(gulp.dest('/code/extensions/arabic/'))
    .pipe(browserSync.reload({
      stream: true
    }))
});


gulp.task('default', ['scripts', 'browser-sync'], function () {
  gulp.watch('/code/extensions/arabic/unpacked/**/*.js', ['scripts']);
  gulp.watch('/code/testcases/**/*.{html,css,js}', ['bs-reload']);
});
