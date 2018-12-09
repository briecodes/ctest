'use strict';

const gulp = require("gulp");
const watch = require("gulp-watch");
const babel =  require('gulp-babel');

const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const concat = require("gulp-concat");
const autoprefixer = require('gulp-autoprefixer');
const browserify = require("gulp-browserify");
var postcss = require('gulp-postcss');
var postcssFixes = require("postcss-fixes")
var flexibility = require('postcss-flexibility');
var uglify = require('gulp-uglify');

gulp.task("scripts:360", function() {
  return gulp.src("./300x600_expanded/js/main.js")
  .pipe(babel({
    presets: ["@babel/preset-env"],
    ignore: 'gulpfile.js'
  }))
  .pipe(browserify())
  .pipe(gulp.dest("./300x600_expanded/dist"))
})

gulp.task("sass:360", function() {
  return gulp.src("./300x600_expanded/sass/*.scss")
         .pipe(sass().on("error", sass.logError))
         .pipe(postcss([postcssFixes]))
         .pipe(autoprefixer({
           browsers: [
             '>1%',
             'last 4 versions',
             'Firefox ESR',
             'not ie < 9',
           ],
           flexbox: "no-2009"
         }))
         .pipe(concat('./style.css'))
         .pipe(gulp.dest("./300x600_expanded/dist"))

})

gulp.task('build:360', ['scripts:360', 'sass:360']);


gulp.task("scripts:160", function() {
  return gulp.src("./160x600/js/main.js")
  .pipe(babel({
    presets: ["@babel/preset-env"],
    ignore: 'gulpfile.js'
  }))
  .pipe(browserify())
  .pipe(gulp.dest("./160x600/dist"))
})

gulp.task("sass:160", function() {
  return gulp.src("./160x600/sass/*.scss")
         .pipe(sass().on("error", sass.logError))
         .pipe(postcss([postcssFixes]))
         .pipe(autoprefixer({
           browsers: [
             '>1%',
             'last 4 versions',
             'Firefox ESR',
             'not ie < 9',
           ],
           flexbox: "no-2009"
         }))
         .pipe(concat('./style.css'))
         .pipe(gulp.dest("./160x600/dist"))

})

gulp.task('build:160', ['scripts:160', 'sass:160']);



gulp.task("scripts:728", function() {
  return gulp.src("./728x90/js/main.js")
  .pipe(babel({
    presets: ["@babel/preset-env"],
    ignore: 'gulpfile.js'
  }))
  .pipe(browserify())
  .pipe(gulp.dest("./728x90/dist"))
})

gulp.task("sass:728", function() {
  return gulp.src("./728x90/sass/*.scss")
         .pipe(sass().on("error", sass.logError))
         .pipe(postcss([postcssFixes]))
         .pipe(autoprefixer({
           browsers: [
             '>1%',
             'last 4 versions',
             'Firefox ESR',
             'not ie < 9',
           ],
           flexbox: "no-2009"
         }))
         .pipe(concat('./style.css'))
         .pipe(gulp.dest("./728x90/dist"))

})

gulp.task('build:728', ['scripts:728', 'sass:728']);