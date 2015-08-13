var jshint = require('gulp-jshint');
var gulp = require('gulp');
var karma = require('gulp-karma');

gulp.task('jshint', function () {
    return gulp.src([ './index.js' ])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('watches', function(){
    gulp.watch(['./*.js', './__tests__/*.js'], ['jshint', 'tests']);
});

gulp.task('tests', function () {
    
    return gulp.src(['./fake/*.js'])
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'run'
        })).on('error', function (err) {
            console.log(err)
        });
});

gulp.task('default', [ 'tests', 'jshint', 'watches' ]);