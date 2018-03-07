var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    webserver = require('gulp-webserver'),
    minify = require('gulp-minify');
    
var src = './process',
    app = './builds/app/';

gulp.task('js', function() {
  return gulp.src( src + '/js/app.js' )
    .pipe(browserify({
      transform: 'reactify',
      debug: false
    }))
    .on('error', function (err) {
      console.error('Error!', err.message);
    })
    .pipe(gulp.dest(app + '/js'));
});

gulp.task('minify', function() {
  gulp.src(app + '/js/app.js')
  .pipe(minify())
  .pipe(gulp.dest(app + '/js'));
})

gulp.task('html', function() {
  gulp.src( app + '/**/*.html');
});

gulp.task('css', function() {
  gulp.src( app + '/css/*.css');
});

gulp.task('watch', function() {
  gulp.watch( src + '/js/**/*.js', ['js']);
  gulp.watch( app + '/css/**/*.css', ['css']);
  gulp.watch([ app + '/**/*.html'], ['html']);
});

gulp.task('webserver', function() {
  gulp.src( app + '/')
    .pipe(webserver({
        livereload: true,
        open: true
    }));
});

gulp.task('default', ['watch', 'html', 'js', 'css', 'minify', 'webserver']);
