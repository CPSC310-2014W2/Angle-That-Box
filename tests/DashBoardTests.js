  'use strict',

  describe('dashboardController', function(){

    beforeEach(angular.mock.module('app'));

    it('Input to set to empty string when item added', angular.mock.inject(function($controller, $injector) {

      var scope = {};
      ctrl = $controller('DashboardCtrl', {$scope:scope});
      expect( scope.checkboxes.length).toBe(0);
    }));

    it('Input to set to empty string when item added', angular.mock.inject(function($controller, $injector) {
      var scope = {};
      ctrl = $controller('DashboardCtrl', {$scope:scope});
      expect( scope.filterTypes.length).toBe(1);
    }));

  });

  // describe('dashboardFactory', function(){

  // 	beforeEach(angular.mock.module('app'));

  // 	it('check list', angular.mock.inject(function($injector) {
  // 		var factory = $injector.get('DashboardFactory');

  //    expect(factory.getList().length).toBe(0);
  //  }));

  //   describe('$scope.sort', function() {

  //     it('sort a list of items A-Z', angular.mock.inject(function($controller, $injector){
  //       var $scope = {};
  //       ctrl = $controller('dashboardController', {$scope:scope});
  //       var $originalList = $scope.checkboxes;
  //       // $scope.list = //reference a json object with 3 entries in it
  //       $scope.checkboxes = shuffle($scope.checkboxes);

  //       $scope.sort('+CULTURAL_SPACE_NAME');
  //       var $result = $scope.checkboxes;
  //       expect($originalList).toEqual($result);
  //     })

  //   })

  // })

  function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}