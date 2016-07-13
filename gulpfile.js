/*
 * gulpfile.js
 * 
 * Build File for the application
 *  
 */

var gulp = require('gulp');
var ts = require('gulp-typescript');
var tslint = require('gulp-tslint');
var browserSync = require('browser-sync').create();

gulp.task('default', ['typescript', 'tslint'], function() {
	gulp.watch('./src/**/*.ts', ['tslint','typescript']);
	gulp.watch('./dist/index.html').on('change', browserSync.reload);
});

// Compiles Typescript to Javascript Code
gulp.task('typescript', () => {
  gulp.src('src/*.ts')
    .pipe(ts({
            declaration: true
        }))
    .pipe(gulp.dest('dist'));
});

// Check Coding of Typescript, if it is correct coded
gulp.task("tslint", () =>
    gulp.src("src/*.ts")
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report())
);

