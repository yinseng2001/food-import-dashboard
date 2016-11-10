/**
 * grunt/pipeline.js
 *
 * The order in which your css, javascript, and template files should be
 * compiled and linked from your views and static HTML files.
 *
 * (Note that you can take advantage of Grunt-style wildcard/glob/splat expressions
 * for matching multiple files, and ! in front of an expression to ignore files.)
 *
 * For more information see:
 *   https://github.com/balderdashy/sails-docs/blob/master/anatomy/myApp/tasks/pipeline.js.md
 */


// CSS files to inject in order
//
// (if you're using LESS with the built-in default config, you'll want
//  to change `assets/styles/importer.less` instead.)
var cssFilesToInject = [
  // '/bower_components/switchery/dist/switchery.min.css',
  // '/bower_components/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css',
  // '/bower_components/magnific-popup/dist/magnific-popup.css',
  // '/bower_components/selectize/dist/css/selectize.bootstrap3.css',
  // '/bower_components/ng-sortable/dist/ng-sortable.min.css',
  // '/bower_components/ng-sortable/dist/ng-sortable.style.min.css',
  'styles/**/*.css',
  'vendor/importer.css',
  // 'fonts/style.css'
];


// Client-side javascript files to inject in order
// (uses Grunt-style wildcard/glob/splat expressions)
var jsFilesToInject = [

  // Load sails.io before everything else
  'js/dependencies/sails.io.js',
  '/bower_components/jquery/dist/jquery.min.js',
  // '/bower_components/bootstrap/dist/js/bootstrap.min.js',
  '/bower_components/angular/angular.min.js',
  '/bower_components/angular-route/angular-route.min.js',
  '/bower_components/angular-sanitize/angular-sanitize.min.js',
  // '/bower_components/ngstorage/ngStorage.min.js',
  // '/bower_components/switchery/dist/switchery.min.js',
  // '/bower_components/ng-switchery/src/ng-switchery.js',
  '/bower_components/moment/min/moment.min.js',
  // '/bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
  // '/bower_components/angular-eonasdan-datetimepicker/dist/angular-eonasdan-datetimepicker.min.js',
  // '/bower_components/angular-bootstrap/ui-bootstrap-custom-2.2.0.min.js',
  // '/bower_components/angular-bootstrap/ui-bootstrap-custom-tpls-2.2.0.min.js',
  // '/bower_components/magnific-popup/dist/jquery.magnific-popup.min.js',
  '/bower_components/underscore/underscore-min.js',
  // '/bower_components/selectize/dist/js/standalone/selectize.min.js',
  // '/bower_components/angular-selectize2/dist/angular-selectize.js',
  // '/bower_components/ngInfiniteScroll/build/ng-infinite-scroll.min.js',
  // '/bower_components/angular-contenteditable/angular-contenteditable.js',
  // '/bower_components/angular-bootstrap-contextmenu/contextMenu.js',
  // '/bower_components/ng-sortable/dist/ng-sortable.min.js',


  // '/js/libraries/crypt/aes.js',
  // '/js/libraries/crypt/pbkdf2.js',
  // '/js/libraries/jsencrypt.js',
  '/js/libraries/excel/ExcelToJson.js',

  // '/bower_components/angular-bootstrap-datetimepicker-directive/angular-bootstrap-datetimepicker-directive.min.js',
  // Dependencies like jQuery, or Angular are brought in here
  'js/dependencies/**/*.js',
   
  // '/js/app/route.js',

  // All of the rest of your client-side js files
  // will be injected here in no particular order.
  '/js/app/app.js',
  '/js/app/run.js',
  'js/app/**/*.js'
  // 'js/**/*.js'
];


// Client-side HTML templates are injected using the sources below
// The ordering of these templates shouldn't matter.
// (uses Grunt-style wildcard/glob/splat expressions)
//
// By default, Sails uses JST templates and precompiles them into
// functions for you.  If you want to use jade, handlebars, dust, etc.,
// with the linker, no problem-- you'll just want to make sure the precompiled
// templates get spit out to the same file.  Be sure and check out `tasks/README.md`
// for information on customizing and installing new tasks.
var templateFilesToInject = [
  'templates/**/*.html'
];







// Default path for public folder (see documentation for more information)
var tmpPath = '.tmp/public/';

// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)
module.exports.cssFilesToInject = cssFilesToInject.map(function(cssPath) {
  // If we're ignoring the file, make sure the ! is at the beginning of the path
  if (cssPath[0] === '!') {
    return require('path').join('!.tmp/public/', cssPath.substr(1));
  }
  return require('path').join('.tmp/public/', cssPath);
});
module.exports.jsFilesToInject = jsFilesToInject.map(function(jsPath) {
  // If we're ignoring the file, make sure the ! is at the beginning of the path
  if (jsPath[0] === '!') {
    return require('path').join('!.tmp/public/', jsPath.substr(1));
  }
  return require('path').join('.tmp/public/', jsPath);
});
module.exports.templateFilesToInject = templateFilesToInject.map(function(tplPath) {
  // If we're ignoring the file, make sure the ! is at the beginning of the path
  if (tplPath[0] === '!') {
    return require('path').join('!assets/', tplPath.substr(1));
  }
  return require('path').join('assets/',tplPath);
});


