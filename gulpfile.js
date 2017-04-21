var gulp = require('gulp');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var order = require('gulp-order');
var replace = require('gulp-replace');
var runSequence = require('run-sequence');

var unicodeEscapeArabicChars = function (match) {
  // Replaces arabic chars with their unicode equivalent.
  var hexCharCode = match.charCodeAt(0).toString(16);
  var zeroPrefixed = ('0000' + hexCharCode).slice(-4);
  return '\\u' + zeroPrefixed;
};

var arabicCharsRegExp = /[^\x00-\x7F]/g;

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
    .pipe(replace(arabicCharsRegExp, unicodeEscapeArabicChars))
    .pipe(gulp.dest('/code/dist/unpacked/'));
});


gulp.task('scripts-pack', function () {
  return gulp.src('/code/dist/unpacked/arabic.js')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
      }
    }))
    .pipe(uglify({
      preserveComments: 'some'
    }))
    .pipe(replace(arabicCharsRegExp, unicodeEscapeArabicChars))
    .pipe(replace('[arabic]/unpacked/arabic.js', '[arabic]/arabic.js'))
    .pipe(gulp.dest('/code/dist/'));
});


gulp.task('scripts-dist', function () {
  return gulp.src('/code/dist/**/*.{js,txt,md}')
    .pipe(gulp.dest('/code/extensions/arabic/'));
});


gulp.task('scripts', function () {
  runSequence(
    'scripts-concat',
    'scripts-pack',
    'scripts-dist',
    'bs-reload'
  );
});


gulp.task('default', ['scripts', 'browser-sync'], function () {
  gulp.watch('/code/src/**/*.js', ['scripts']);
  gulp.watch('/code/testcases/**/*.{html,css,js,yml}', ['scripts']);
  gulp.watch('/code/mathjax/unpacked/jax/input/TeX/**/*.js', ['bs-reload']);
});
