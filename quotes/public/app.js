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
		$routeProvider.otherwise({redirectTo: '/404'});
		
		//$http.defaults.headers.common['x-access-token']= $localStorage.token;
		
		$httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
            return {
                'request': function (config) {	
					// append token to header
                    config.headers = config.headers || {};
					// check if token exists
                    if ($localStorage.token) {						
                        config.headers.Authorization = 'Bearer ' + $localStorage.token;					
						// append token to header						
						config.headers['x-access-token'] = $localStorage.token;
						//console.log('headers:'+config.headers['x-access-token']);
                    } else {
						console.log('no token provided');
						$location.path('/login');
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