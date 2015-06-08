// Imports.
var concat  = require('gulp-concat');
var fs      = require('fs');
var gulp    = require('gulp');
var replace = require('gulp-replace');
var uglify  = require('gulp-uglify');

/**
 * Concatenates all files generating an unique output file.
 */
gulp.task('default', function () {
	gulp.src(['src/util.js', 'src/facebot.js', , 'src/play-joke.js'])
		.pipe(concat('facebot.js'))
		.pipe(uglify())
		.pipe(replace("<", '&lt;'))
		.pipe(replace(">", '&gt;'))
		.pipe(replace('\'', '&#39;'))
		.pipe(gulp.dest('build'));

	var script = fs.readFileSync('build/facebot.js');
	
	gulp.src('src/index.html')
		.pipe(replace('{{script}}', script))
		.pipe(gulp.dest('build'));
});