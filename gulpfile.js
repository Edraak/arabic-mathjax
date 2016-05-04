var gulp = require('gulp');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var order = require('gulp-order');
var replace = require('gulp-replace');


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


gulp.task('scripts-concat', function () {
  return gulp.src('/code/src/**/*.js')
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
    .pipe(gulp.dest('/code/extensions/arabic/unpacked/'));
});


gulp.task('scripts-pack', ['scripts-concat'], function () {
  return gulp.src('/code/extensions/arabic/unpacked/arabic.js')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
      }
    }))
    .pipe(uglify({
      preserveComments: 'some'
    }))
    .pipe(replace(/[^\x00-\x7F]/g, function (match) {
      var hexCharCode = match.charCodeAt(0).toString(16);
      var zeroPrefixed = ('0000' + hexCharCode).slice(-4);
      return '\\u' + zeroPrefixed;
    }))
    .pipe(replace('[Contrib]/arabic/unpacked/arabic.js', '[Contrib]/arabic/arabic.js'))
    .pipe(gulp.dest('/code/extensions/arabic/'));
});


gulp.task('scripts', ['scripts-pack'], function () {
  browserSync.reload();
});


gulp.task('default', ['scripts', 'browser-sync'], function () {
  gulp.watch('/code/src/**/*.js', ['scripts']);
  gulp.watch('/code/testcases/**/*.{html,css,js}', ['bs-reload']);
  gulp.watch('/code/mathjax/unpacked/jax/input/TeX/**/*.js', ['bs-reload']);
});
