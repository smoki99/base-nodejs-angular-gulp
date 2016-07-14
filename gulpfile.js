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

var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('default', ['typescript', 'tslint', 'pug', 'copy-bootstrap', 'copy-libs', 'styles'], () => {
	gulp.watch('./src/**/*.ts', ['tslint','typescript']);
    gulp.watch('./src/**/*.pug', ['pug']);
    gulp.watch('./src/**/*.scss', ['styles']);
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
    gulp.src([
        'src/pug/**/*.pug','!src/pug/include/**'
        ])
      .pipe(pug({
          pretty: true
      }))
      .pipe(gulp.dest('dist/views'));
});

gulp.task('copy-libs', () => {
    gulp.src('node_modules/angular/angular.js')
        .pipe(gulp.dest('dist/lib'));
    gulp.src('node_modules/jquery/dist/*.js')
        .pipe(gulp.dest('dist/lib'));
});

gulp.task('copy-bootstrap', () => {
    //gulp.src('node_modules/bootstrap3/dist/css/bootstrap*')
    //    .pipe(gulp.dest('dist/css'));
    gulp.src('node_modules/bootstrap3/dist/js/*')
        .pipe(gulp.dest('dist/lib'));
    gulp.src('node_modules/bootstrap3/fonts/*')
        .pipe(gulp.dest('dist/fonts'));
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

gulp.task('styles', function() {
	gulp.src('src/sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream());
});