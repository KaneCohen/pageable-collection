var gulp = require('gulp'),
    uglify = require('gulp-uglifyjs'),
    nodeunit = require('gulp-nodeunit-runner'),
    jshint = require('gulp-jshint'),
    fs = require('fs');

gulp.task('uglify', function() {
  try {
    fs.unlinkSync('./lib/pageable-collection.min.js');
  } catch(err) { }

  gulp.src('./lib/pageable-collection.js')
    .pipe(uglify('pageable-collection.min.js', {
      mangle: true,
      compress: {
        dead_code: false
      },
      output: {
        ascii_only: true,
        comments: /^!|@preserve|@license|@cc_on/i
      },
      report: 'min',
    }))
    .pipe(gulp.dest('./lib/'));
});

gulp.task('lint', function() {
  return gulp.src('./lib/pageable-collection.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
