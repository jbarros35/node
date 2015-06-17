'use strict';
define([
	'angular',
	'angularRoute'
], function(angular) {

	var menu = angular.module('myApp.menu', ['ngRoute','ui.bootstrap']);


	// menu directive
	menu.directive("menu", ['$parse', '$http', '$compile', '$templateCache', function($parse, $http, $compile, $templateCache) {

		  return {
		    restrict: "A",
		    replace: true,
		    scope: false,
		    transclude: true,
		    templateUrl: "layout/menu.html",

		    controller: ['$scope', '$http', '$filter', function ($scope, $http, $filter) {
		    	console.log('menu loaded');
			}]
		    };
		  }]);
});

