/**
 * Created by jose on 7/12/2015.
 */
'use strict';

define(['angular', 'angularRoute'], function(angular) {
    var app = angular.module('homeApp', ['ngRoute']);

    app.config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.
                when('/', {
                    templateUrl: 'partials/home.html',
                    controller: 'homeController'
                })
                .when('/404', {
                    templateUrl: 'partials/404.html',
                })
                .otherwise({
                    redirectTo: '/404'
                });
        }
    ]);

    app.controller('homeController', function ($scope) {
        $scope.message = 'This is Add new order screen';
    });

    return app;
});