'use strict',

describe('dashboardController', function(){

  beforeEach(angular.mock.module('app'));

  it('Input to set to empty string when item added', angular.mock.inject(function($controller, $injector) {
    var factory = $injector.get('DashboardFactory');

    expect()
    var scope = {},
        ctrl = $controller('DashboardCtrl', {$scope:scope});
    scope.input = "hello world";
    scope.add('bugs');
    expect(scope.input).toBe("");
  }));

 
});

describe('dashboardFactory', function(){

	beforeEach(angular.mock.module('app'));

	it('check list', angular.mock.inject(function($injector) {
		var factory = $injector.get('DashboardFactory');

	expect(factory.getList().length).toBe(0);
  }));

})