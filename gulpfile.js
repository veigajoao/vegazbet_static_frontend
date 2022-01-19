'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');

const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')

gulp.task('sass', function () {
   return gulp.src('./scss/*.scss')
   .pipe(concat('custom.scss'))
   .pipe(sass().on('error', sass.logError))
   .pipe(gulp.dest('./docs/css/'));
});