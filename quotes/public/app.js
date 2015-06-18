'use strict';

define([
	'angular',
	'angularRoute',
	'angular-resource',
	'ui-bootstrap',
	'layout/menu',
	'login/login',
	'home/home',
	'blog/blog'
], function(angular, angularRoute) {
	// Declare app level module which depends on views, and components
	return angular.module('myApp', [
		'ngRoute',
		'myApp.menu',
		'myApp.home',
		'myApp.blog',
		'angularRestfulAuth'
	]).
	config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
		$routeProvider.otherwise({redirectTo: '/home'});
		$httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
            return {
                'request': function (config) {					
                    config.headers = config.headers || {};
                    if ($localStorage.token) {
                        config.headers.Authorization = 'Bearer ' + $localStorage.token;
                    }
                    return config;
                },
                'responseError': function(response) {
                    if(response.status === 401 || response.status === 403) {
                        $location.path('/login');
                    }
                    return $q.reject(response);
                }
            };
        }]);
	}]);
	

});