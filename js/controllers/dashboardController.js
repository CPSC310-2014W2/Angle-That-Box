app.controller('DashboardCtrl', function($scope, $http, $firebase, DashboardFactory, MapFactory) { //name is SimpleCtrl, the parameters are dependencies

   var factory = DashboardFactory; //this is an instance of the factory
   var mapFactory = MapFactory;
   $scope.markers = []; //this is not used at the moment, but we may need a reference to the markers
   $scope.list = factory.getList(); //$scope is the link between view and controller, getList is a function of DashboardFactory

   $scope.add = function(input) { 
      if (input != undefined && input != "") {
         factory.addToList(input);

         $scope.input = ""; //input is defined in dashboard.html
      }
   }

   $scope.logout = function() {
	   factory.logout();
   }
   
   var map = mapFactory.createMap();
   mapFactory.getMapData(map, $scope.markers);

});