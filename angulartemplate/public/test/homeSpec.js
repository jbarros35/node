/**
 * Created by jose on 7/12/2015.
 */
/*global module, inject */
'use strict';

define(['home', 'angularMocks'], function(app) {

    describe('homeController', function () {
        var scope, $location, createController;
        beforeEach(module('homeApp'));

        beforeEach(inject(function ($rootScope, $controller, _$location_) {
            $location = _$location_;
            scope = $rootScope.$new();

            createController = function () {
                return $controller('homeController', {
                    '$scope': scope
                });
            };
        }));

        it('should have message', function () {
            var controller = createController();
            $location.path('/');
            expect($location.path()).toBe('/');
            expect(scope.message).toEqual('This is Add new order screen');
        });
    });

});
