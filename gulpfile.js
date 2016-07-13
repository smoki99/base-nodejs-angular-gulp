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
var pug = require('gulp-pug');
var nodemon = require('gulp-nodemon');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');

gulp.task('default', ['typescript', 'tslint', 'pug'], () => {
	gulp.watch('./src/**/*.ts', ['tslint','typescript']);
    gulp.watch('./src/**/*.pug', ['pug']);
	gulp.watch('./dist/view/**/*.html').on('change', browserSync.reload);
});

// Compiles Typescript to Javascript Code
gulp.task('typescript', () => {
  gulp.src('src/**/*.ts')
    .pipe(ts({
            declaration: true
        }))
    .pipe(gulp.dest('dist'));
});

// Check Coding of Typescript, if it is correct coded
gulp.task("tslint", () =>
    gulp.src("src/**/*.ts")
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report())
);

// Convert Pug formally known as Jade to html
gulp.task('pug', () => {
    gulp.src('src/pug/**/*.pug')
      .pipe(pug({
          pretty: true
      }))
      .pipe(gulp.dest('dist/views'));
});

gulp.task('copy-libs', () => {
    gulp.src('node_modules/angular/angular.js')
        .pipe(gulp.dest('dist/lib'));
});


// Start the webserver with autoreload
gulp.task('webserver', function() {
	// listen for changes
	livereload.listen();
	// configure nodemon
	nodemon({
		// the script to run the app
		script: 'dist/server.js',
		ext: 'js'
	}).on('restart', function(){
		// when the app has restarted, run livereload.
		gulp.src('app.js')
			.pipe(livereload())
			.pipe(notify('Reloading page, please wait...'));
	})
});
