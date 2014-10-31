/*
 * jubiq
 * https://github.com/parroit/jubiq
 *

 * Copyright (c) 2014 Andrea Parodi
 * Licensed under the MIT license.
 */

'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');

var pure = require('gulp-pure-cjs');

gulp.task('build-example', function() {
    gulp.src('./example/index.html')
        .pipe(gulp.dest('./dist/example'));

    return gulp.src('./example/index.js',{basedir:'./example/'})
        .pipe(pure({}).on('error',console.log.bind(console)))
        .pipe(gulp.dest('./dist'));
});

gulp.task('test', function () {
  return gulp.src('./test/*.js')
    .pipe(mocha({
      ui: 'bdd',
      reporter: 'spec'
    }));
});

gulp.task('watch', function () {
  gulp.watch(['./lib/**/*.js', './test/**/*.js'], ['test']);
});

gulp.task('default', ['test', 'watch']);
