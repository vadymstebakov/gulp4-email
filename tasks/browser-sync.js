'use strict';

const browserSync = require('browser-sync').create();

module.exports = function (options) {
    return function (callback) {
        browserSync.init({
            server: {
                baseDir: 'src',
                index: 'email.html',
            },
            notify: false,
            ghostMode: false,
            tunnel: true,
        });

        browserSync
            .watch(options.src)
            .on('change', browserSync.reload)
            .on('add', browserSync.reload)
            .on('unlink', browserSync.reload);

        callback();
    };
};
