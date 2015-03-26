app.controller("RoutesController", function($scope, $firebase, RoutesFactory, MapFactory, DashboardFactory) {

	var factory = DashboardFactory;
	var rfactory = RoutesFactory;
	var mapFactory = MapFactory; 

	$scope.routes = rfactory.getRoutes();
	$scope.list = factory.getList(); //$scope is the link between view and controller, getList is a function of DashboardFactory



	$scope.markers = []; //storing markers for reference


	var map = mapFactory.createMap();
	$scope.list.$loaded().then(function() {
		var routeToRoute = RoutesFactory.getTheRoute($scope.list, $scope.routes);/*.then(function(retArray){
			mapFactory.createRoute(itemsToRoute);
		});*/
		mapFactory.createRoute(routeToRoute);
	});

/*	$scope.list.$loaded().then(function() {
		var lister = [$scope.list[0], $scope.list[$scope.list.length -1]];
		mapFactory.getMapData(map, lister, $scope.markers);
	});
*/
	    
	$scope.delete = function(index) {
		$scope.routes.$remove(index);
	}
});