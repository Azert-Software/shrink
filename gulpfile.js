////////////////////////////////////////////////////////
//////// Required
////////////////////////////////////////////////////////

var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  less = require('gulp-less'),
  minifycss = require('gulp-minify-css'),
  concatcss = require('gulp-concat-css'),
  autoprefixer = require('gulp-autoprefixer'),
  typescript = require('gulp-typescript'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  plumber = require('gulp-plumber');

////////////////////////////////////////////////////////
//////// scripts task
////////////////////////////////////////////////////////

gulp.task('typescript',function(){
  gulp.src(['public/js/**/*.ts'])
    .pipe(plumber())
    .pipe(typescript())
    .pipe(rename({suffix:'.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'))
    .pipe(reload({stream:true}));
});

gulp.task('scripts',function(){
  gulp.src(['*/**/*.js','!*/public/js/**/*.js'])
    .pipe(reload({stream:true}));
});

////////////////////////////////////////////////////////
//////// less tasks
////////////////////////////////////////////////////////

gulp.task('less',function(){
  gulp.src('public/stylesheets/**/*.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest('public/stylesheets'))
    .pipe(reload({stream:true}));
});

gulp.task('normalise',function(){
  gulp.src('public/stylesheets/**/*.css')
    .pipe(plumber())
    .pipe(autoprefixer())
    .pipe(concatcss("main.min.css"))
    .pipe(minifycss())
    .pipe(gulp.dest("public/stylesheets"))
    .pipe(reload({stream:true}));
});

////////////////////////////////////////////////////////
//////// hbs tasks
 ////////////////////////////////////////////////////////
gulp.task('hbs',function(){
    gulp.src(['views/**/*.handlebars'])
    .pipe(reload({stream:true}));
});

////////////////////////////////////////////////////////
//////// browser reload
////////////////////////////////////////////////////////
gulp.task('browser-sync',function(){
  browserSync.init({
    proxy:"localhost:3030"
  });
});


////////////////////////////////////////////////////////
//////// watch tasks
////////////////////////////////////////////////////////

gulp.task('watch',function(){
    gulp.watch('public/js/**/*.ts',['scripts'])
    gulp.watch('public/stylesheets/**/*.less',['less'])
    gulp.watch('*.hbs',['hbs'])
    gulp.watch('views/**/*.handlebars',['hbs'])
})


////////////////////////////////////////////////////////
//////// default task
////////////////////////////////////////////////////////
 gulp.task('default',['typescript','scripts','watch','less','normalise','hbs','browser-sync'])
