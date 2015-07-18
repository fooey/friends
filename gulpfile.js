'use strict';

var gulp       = require('gulp');
var livereload = require('gulp-livereload');





/*
 *
 * paths
 *
 */

var paths = require('./gulp/config-paths');





/*
 *
 * CSS
 *
 */

var css = require('./gulp/compile-css');


gulp.task('css-custom', [], css.custom(paths, livereload));
gulp.task('css-bootstrap', [], css.bootstrap(paths, livereload));
// gulp.task('css-compress', [], css.compress(paths, livereload));

gulp.task('css-build', ['css-bootstrap', 'css-custom' /*, 'css-compress'*/ ], function(cb) {
    cb()
});





/*
 *
 * JS
 *
 */

var buildJS = require('./gulp/compile-js')(paths, livereload);
gulp.task('js-build', [], buildJS);




/*
 *
 * System
 *
 */

gulp.task('watch', ['build-assets'], function() {
    livereload.listen();

    gulp.watch([
        paths.css.src + '/**/*.less',
        '!' + paths.css.src + '/bootstrap/*.less',
    ], ['css-custom']);

    gulp.watch([
        paths.css.src + '/bootstrap/*.less',
    ], ['css-bootstrap']);
});




/*
 *
 * nodemon
 *
 */

var nodemon = require('./gulp/nodemon');

gulp.task('nodemon', function(cb) {
    var options = {
        env: {
            NODE_ENV: 'development',
        },
    };
    return nodemon(options, livereload, cb);
});





/*
 *
 * Tasks Wrappers
 *
 */


gulp.task('build-assets', ['css-build', 'js-build'], function(cb) {
    cb()
});

gulp.task('dev', ['default'], function(cb) {
    cb()
});
gulp.task('default', ['nodemon', 'watch', 'build-assets'], function(cb) {
    cb()
});
