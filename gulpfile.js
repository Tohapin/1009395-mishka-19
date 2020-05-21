"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
const del = require('del');
var imagemin = require("gulp-imagemin");
var csso = require('gulp-csso');

gulp.task('default', function () {
    return gulp.src('source/css/style.css')
        .pipe(csso())
        .pipe(gulp.dest('build/css'));
});

gulp.task('development', function () {
    return gulp.src('source/css/style.css')
        .pipe(csso({
            restructure: false,
            sourceMap: true,
            debug: true
        }))
        .pipe(gulp.dest('build/css'));
});

gulp.task("imagemin", function () {
  return gulp.src('source/img/**')
  .pipe(imagemin())
  .pipe(gulp.dest('build/img'))
});

gulp.task("css", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("source/css"))
    .pipe(server.stream());
});

gulp.task("server", function () {
  server.init({
    server: "source/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", gulp.series("css"));
  gulp.watch("source/*.html").on("change", server.reload);
});

gulp.task('html', function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"))
});

gulp.task('copy', function () {
  return gulp.src([
    "source/fonts/**/*.{woff, woff2}",
    "source/img/**",
    "source/js/**",
    "source/*.ico"
    ],{
      base: "source"
    })
    .pipe(gulp.dest('build'));
});

gulp.task('clean', function () {
  return del("build");
});


gulp.task("build", gulp.series("clean", "css", "development", "default", "imagemin", "copy", "html"));
gulp.task("start", gulp.series("css", "server"));
