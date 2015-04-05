'use strict',

describe('ProfileFactory', function(){

	beforeEach(angular.mock.module('app'));

	 beforeEach(angular.mock.inject(function($injector) { 
        factory = $injector.get('ProfileFactory');
        }));
  
	
	it('convertBirthday should update user birthday into readable format', angular.mock.inject(function($injector) {
        var userData = factory.getUserData;
        factory.convertBirthday();

        //expect(userData).toBe("April 13 1994");
  }));


});