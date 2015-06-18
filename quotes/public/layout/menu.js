'use strict';
define([
	'angular',
	'angularRoute',
	'login/login'
], function(angular) {

	var menu = angular.module('myApp.menu', ['ngRoute','ui.bootstrap', 'angularRestfulAuth']);


	// menu directive
	menu.directive("menu", ['$parse', '$http', '$compile', '$templateCache', 'Main', function($parse, $http, $compile, $templateCache, Main) {

		  return {
		    restrict: "A",
		    replace: true,
		    scope: false,
		    transclude: true,
		    templateUrl: "layout/menu.html",

		    controller: ['$scope', '$http', '$filter', function ($scope, $http, $filter) {
		    	console.log('menu loaded');
				
				$scope.me = function() {
					Main.me(function(res) {
						$scope.myDetails = res;
					}, function() {
						$rootScope.error = 'Failed to fetch details';
					})
				};
 
				$scope.logout = function() {
					Main.logout(function() {
						window.location = "#login"
					}, function() {
						alert("Failed to logout!");
					});
				};
			}]
		    };
		  }]);
});

