'use strict';

let gulp = require( 'gulp' ),
    bs = require( 'browser-sync' ),
    reload = bs.reload,
    nodemon = require( 'gulp-nodemon' ),
    browserify = require( 'browserify' ),
    babelify = require( 'babelify' ),
    source = require('vinyl-source-stream');

/* Server */
gulp.task( 'browser-sync', ['nodemon'], function() {
  bs.init(null, {
    proxy: 'localhost:5000',
  });
});

gulp.task( 'nodemon', function ( cb ) {
  var callbackCalled = false;
  return nodemon( {script: './server.js'} ).on('start', function () {
    if ( !callbackCalled ) {
      callbackCalled = true;
      cb();
    }
  });
});

/* Browserify */
gulp.task( 'browserify', [], () => {
   return browserify( {entries: ['app/main.js']} )
    .transform( babelify )
    // .transform(vueify)
    .bundle()
    .pipe( source( 'bundle.js' ) )
    .pipe( gulp.dest( 'public/app' ) );
});

/* HTML */
gulp.task( 'html', () => {
  return gulp.src( 'app/index.html' )
    .pipe( gulp.dest( 'public/app' ) );
});

/* Default */
gulp.task( 'default', ['browserify', 'html', 'browser-sync'], function () {
  // gulp.watch(["./src/views/*.html"], reload);
});
