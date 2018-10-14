'use strict';

let gulp = require('gulp'),
  concat = require('gulp-concat'),
  maps = require('gulp-sourcemaps'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  del = require('del');

gulp.task('concatScripts', () => {
  return gulp.src([
    'js/jquery-3.3.1.min.js',
    'js/circle/autogrow.js',
    'js/circle/circle.js'
  ])
    .pipe(maps.init())
    .pipe(concat('global.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('js'));
});


gulp.task('minifyScripts', ['concatScripts'], () =>{
  return gulp.src('js/global.js')
    .pipe(uglify())
    .pipe(rename('global.min.js'))
    .pipe(gulp.dest('js'));

});

gulp.task('compileSass', () => {
  return gulp.src('sass/global.scss')
    .pipe(maps.init())
    .pipe(sass())
    .pipe(maps.write('./'))
    .pipe(gulp.dest('css'));
});

gulp.task('watchSass', () => {
  gulp.watch('sass/**/*.scss', ['compileSass']);
});

gulp.task('clean', () => {
  del(['dist', 'css/global.css*', 'js/global.*']);
});

gulp.task('build', ['concatScripts', 'minifyScripts', 'compileSass'], () => {
  return gulp.src(['css/global.css', 'js/global.min.js', 'index.html', 'js/jquery-3.3.1.min.js', 
    'images/**', 'icons/**'], { base: './' })
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['build']);