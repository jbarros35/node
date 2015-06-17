'use strict';
define([
	'angular',
	'angularRoute'
], function(angular) {

	var home = angular.module('myApp.home', ['ngRoute','ui.bootstrap']);

	home.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/home', {
			templateUrl: 'home/home.html',
			controller: 'homeCtrl'
		});
	}]);

	home.controller('homeCtrl', ['$scope', function($scope) {
		// Home controller logic
	}]);


});

