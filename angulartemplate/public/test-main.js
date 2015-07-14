var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    allTestFiles.push(file);
  }
});

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base/javascripts',
  paths: {
    angular: "../bower_components/angular/angular",
    angularRoute: "../bower_components/angular-route/angular-route",
    angularMocks: "../bower_components/angular-mocks/angular-mocks",
    ngStorage:'../bower_components/ngstorage/ngStorage',
  },
  shim: {
    'angular' : {'exports' : 'angular'},
    'angularRoute': ['angular'],
    'angularMocks': {
      deps:['angular'],
      'exports':'angular.mock'
    },
    'ngStorage': ['angular'],
  },
  priority: [
    "angular"
  ],
  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
});
