'use strict';

define([
	'angular',
	'angularRoute',
	'angular-resource',
	'ui-bootstrap',
	'layout/menu',
	'home/home',
	'blog/blog'
], function(angular, angularRoute) {
	// Declare app level module which depends on views, and components
	return angular.module('myApp', [
		'ngRoute',
		'myApp.menu',
		'myApp.home',
		'myApp.blog'
	]).
	config(['$routeProvider', function($routeProvider) {
		$routeProvider.otherwise({redirectTo: '/home'});
	}]);
});


