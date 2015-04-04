'use strict';
/**
// Mocked Factory
angular.mock.module('mock.profile', []).
    factory('ProfileFactory', function() {
        var profileFactory = {};
 
        profileFactory.getUserData = function() { **
            var mockUserData = {
                authProvider: "google",
                bio: "test user",
                birthdate: "test birthday",
                location: "test location",
                name: "test username"
            }
            return mockUserData;
        };
        return profileFactory;
    });
**/
 
describe('Profile Controller', function() {
    var ctrl, scope, profilefactory, authfactory;

    beforeEach(angular.mock.module('app'));
 
    beforeEach(angular.mock.inject(function($controller, $rootScope, $injector) { 
        scope = $rootScope.$new();
        profilefactory = $injector.get('ProfileFactory');
 
        ctrl = $controller('ProfileController', {
            $scope: scope,
        });
 
    }));
    

    it('should assign data to scope', angular.mock.inject(function($injector) {
        var userData = profilefactory.getUserData();

   // expect(profilefactory.getUserData).toHaveBeenCalled();
    expect(scope.userData).toBe(userData);
    })); 
        
    it('should delete photo and set profilePhoto to true', angular.mock.inject(function($injector) {
        var result = profilefactory.delete();
        

    //    expect(profilefactory.delete).toHaveBeenCalled();
        expect(scope.profilePhoto).toBe(result);
    }));
    
  });






    
