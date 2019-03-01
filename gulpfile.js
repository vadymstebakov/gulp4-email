'use strict';

const gulp = require('gulp');
const path = {
	dist: { 
		html: 'dist/'
	},
	src: {
		html: 'src/email.html',
		scss: 'src/scss/**/*.scss',
		css: 'src/css/',
	},
	watch: {
		html: 'src/email.html',
		style: 'src/scss/**/*.scss',
		all: 'src/**/*.*'
	}
};

// Lazy Task
function lazyRequireTask(taskName, path, options) {
	options = options || {};
	options.taskName = taskName;
	gulp.task(taskName, function(callback) {
		let task = require(path).call(this, options);
		return task(callback);
	});
}

// Clear dir
lazyRequireTask('clean', './tasks/clean.js', {
	src: path.dist.html
});

// HTML
lazyRequireTask('html', './tasks/html.js', {
	src: path.src.html,
	dist: path.dist.html
});

// SCSS to CSS
lazyRequireTask('style', './tasks/style.js', {
	src: path.src.scss,
	dist: path.src.css
});

// Browser-Sync
lazyRequireTask('browser-sync', './tasks/browser-sync.js', {
	src: path.watch.all
});

// Watcher
lazyRequireTask('watch', './tasks/watcher.js', {
	htmlWatch: path.watch.html,
	styleWatch: path.watch.style,
});

// Builder
gulp.task('build', gulp.series('style', 'html'));

// Start
gulp.task('default', gulp.series('build', gulp.parallel('watch', 'browser-sync')));