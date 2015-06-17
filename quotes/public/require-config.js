'use strict';

if(window.__karma__) {
	var allTestFiles = [];
	var TEST_REGEXP = /spec\.js$/;

	var pathToModule = function(path) {
		return path.replace(/^\/base\/app\//, '').replace(/\.js$/, '');
	};

	Object.keys(window.__karma__.files).forEach(function(file) {
		if (TEST_REGEXP.test(file)) {
			// Normalize paths to RequireJS module names.
			allTestFiles.push(pathToModule(file));
		}
	});
}

require.config({
	paths: {
		angular: 'bower_components/angular/angular',
		angularRoute: 'bower_components/angular-route/angular-route',
		'ui-bootstrap': 'bower_components/angular-bootstrap/ui-bootstrap-tpls',
		angularMocks: 'bower_components/angular-mocks/angular-mocks',
		'angular-resource': 'bower_components/angular-resource/angular-resource',
		text: 'bower_components/requirejs-text/text',
		//'jQuery': 'bower_components/jquery/dist/jquery'
		'jQuery': 'assets/js/jquery'

	},
	shim: {
		'angular' : {'exports' : 'angular'},
		'angularRoute': ['angular'],
		'angularMocks': {
			deps:['angular'],
			'exports':'angular.mock'
		},
		'ui-bootstrap': ['angular'],
		'angular-resource': ['angular'],
		'jQuery': {'exports' : 'jQuery'}
	},
	priority: [
		"angular"
	],
	deps: window.__karma__ ? allTestFiles : [],
	callback: window.__karma__ ? window.__karma__.start : null,
	baseUrl: window.__karma__ ? '/base/app' : '',
});

require([
	'angular',
	'jQuery',
	'app'
	], function(angular, app) {
		var $html = angular.element(document.getElementsByTagName('html')[0]);
		angular.element().ready(function() {
			console.log('bootstrap ok');
			// bootstrap the app manually
			angular.bootstrap(document, ['myApp']);
		});
	}
);

var globalConfig = {
	    serviceURL: 'http://localhost:8080/businessdata/api'
	};