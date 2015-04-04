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


    // include previous module containing mocked factory which will override actual factory, because it's declared later
    // beforeEach(angular.mock.module('mock.profile')); 
 
    beforeEach(angular.mock.inject(function($controller, $rootScope, $injector) { // inject mocked factory
        scope = $rootScope.$new();
        profilefactory = $injector.get('ProfileFactory');
        authfactory = $injector.get('AuthFactory');
 
        ctrl = $controller('ProfileController', {
            $scope: scope,
            profilefactory: _$ProfileFactory_,
            authfactory: _$AuthFactory_
        });
 
    }));
    

    it('should assign data to scope', angular.mock.inject(function($injector) {
        var profilefactory = $injector.get('ProfileFactory');
        var authfactory = $injector.get('AuthFactory');
        var userData = profilefactory.getUserData();

        authfactory.verifyAuthenticated();

    expect(profilefactory.getUserData).toHaveBeenCalled();
    //expect(scope.userData).toBe(userData);
    })); 
        
    it('should delete photo and set profilePhoto to true', angular.mock.inject(function($injector) {
        var profilefactory = $injector.get('ProfileFactory');
        var authfactory = $injector.get('AuthFactory');
        var result = profilefactory.delete();
        authfactory.verifyAuthenticated();

        expect(profilefactory.delete).toHaveBeenCalled();
       // expect(scope.profilePhoto).toBe(result);
    }));
    
  });






    
