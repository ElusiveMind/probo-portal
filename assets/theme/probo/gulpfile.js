var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    webserver = require('gulp-webserver'),
    minify = require('gulp-minify');
    
var src = './process',
    app = './',
    css = './css';

gulp.task('js', function() {
  return gulp.src( src + '/js/app.js' )
    .pipe(browserify({
      transform: 'reactify',
      debug: true
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

gulp.task('css', function() {
  gulp.src( css + '/*.css');
});

gulp.task('default', ['js', 'css', 'minify']);
