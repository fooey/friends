'use strict';

// jscs:disable esnext
// jscs:disable disallowKeywords

var _ = require('lodash');
var nodemon = require('gulp-nodemon');


module.exports = function(options, livereload, cb) {
    var called = false;

    var config = _.merge({
        script: './server.js',
        ext: 'js',
        ignore: [
            'gulpfile.js',

            'gulp/**',
            'js/**',
            'data/**',
        ],
        env: {
            PORT: '3000',
            NODE_PATH: './',
        },

        delay: 200,
    }, options);

    // console.log('nodemon config', config);


    return nodemon(config)
        .on('start', function() {
            livereload.reload('');

            if (!called) {
                called = true;
                cb();
            }
        });
};