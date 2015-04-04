'use strict',

describe('ProfileFactory', function(){

	beforeEach(angular.mock.module('app'));
  

	it('convertBirthday should update user birthday into readable format', angular.mock.inject(function($injector) {
        var factory = $injector.get('ProfileFactory');

        var userData =  factory.getUserData;
        factory.convertBirthday();
        userData = factory.getUserData();

        expect(factory.getUserData).toBe("April 13 1994");
  }));

});