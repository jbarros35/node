/**
 * Created by jlopesde on 13-07-2015.
 */
'use strict';

define([
    'angular',
    'angularRoute',
    'javascripts/home'
], function(angular) {
    // Declare app level module which depends on views, and components
    return angular.module('myApp', ['homeApp']);
});