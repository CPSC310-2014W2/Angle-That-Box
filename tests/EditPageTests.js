'use strict';

describe('Profile Controller', function() {
    var ctrl, scope, factory;

    beforeEach(angular.mock.module('app'));
 
    beforeEach(angular.mock.inject(function($controller, $rootScope, $injector) { 
        scope = $rootScope.$new();
        factory = $injector.get('EditFactory');
 
        ctrl = $controller('EditController', {
            $scope: scope,
        });
 
    }));

    it('$scope.updateName should update the name with the input', angular.mock.inject(function($injector) {
        scope.updateName("Kim");

        expect(scope.name).toBe("Kim");
    })); 

    it('$scope.updateLocation should update the location with the input', angular.mock.inject(function($injector) {
        scope.updateLocation("Canada");

        expect(scope.location).toBe("Canada");
    })); 

    it('$scope.updateBio should update the bio with the input', angular.mock.inject(function($injector) {
        scope.updateBio("Hello!");

        expect(scope.bio).toBe("Hello!");
    })); 

        it('$scope.saveName should save the name and set $scope.name to null', angular.mock.inject(function($injector) {
        spyOn(factory, 'saveName');
        scope.updateName("Kim");
        scope.saveName();

        expect(scope.name).toBe(null);
        expect(factory.saveName).toHaveBeenCalled();
    })); 

    it('$scope.saveLocation should save the location and set $scope.location to null', angular.mock.inject(function($injector) {
    	spyOn(factory, 'saveLocation');
    	scope.updateLocation("Canada");
        scope.saveLocation();

        expect(scope.location).toBe(null);
        expect(factory.saveLocation).toHaveBeenCalled();
    })); 

    it('$scope.saveBio should save the bio and set $scope.bio to null', angular.mock.inject(function($injector) {
    	spyOn(factory, 'saveBio');
    	scope.updateBio("Hello!");
        scope.saveBio();

        expect(scope.bio).toBe(null);
        expect(factory.saveBio).toHaveBeenCalled();
    })); 




    });