'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

module.exports = function (options) {
    return function () {
        return gulp
            .src(options.src)
            .pipe(
                $.plumber({
                    errorHandler: $.notify.onError(function (err) {
                        return {
                            title: 'scss',
                            message: err.message,
                        };
                    }),
                })
            )
            .pipe($.cached('style'))
            .pipe($.sass({ outputStyle: 'expanded' }))
            .pipe(
                $.autoprefixer({
                    browsers: ['> 0.1%'],
                    cascade: false,
                })
            )
            .pipe($.debug({ title: 'DEBUG style' }))
            .pipe($.remember('style'))
            .pipe(gulp.dest(options.dist));
    };
};
