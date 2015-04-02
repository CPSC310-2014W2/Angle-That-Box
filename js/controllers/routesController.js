app.controller("RoutesController", function($scope, $firebase, RoutesFactory, MapFactory, DashboardFactory) {

	var factory = DashboardFactory;
	var rfactory = RoutesFactory;
	var mapFactory = MapFactory; 

	$scope.routes = rfactory.getRoutes();
	$scope.orderSelect = [];
	$scope.routeOrder = [];
	$scope.markers = []; //storing markers for reference


	$scope.routes.$loaded().then(function(){
		$scope.orderSelect = RoutesFactory.getSelectable($scope.routes);
	})

	$scope.list = factory.getList(); 


	var map = mapFactory.createMap();
	$scope.list.$loaded().then(function() {
      mapFactory.populateMap(map, RoutesFactory.getTheRoute($scope.list, $scope.routes));
  	});


	$scope.createRoute = function() {
		$scope.list.$loaded().then(function() {
		var routeToRoute = RoutesFactory.getTheRouteSorted($scope.list, $scope.routes);
		mapFactory.clearMarkers();
		mapFactory.createRoute(routeToRoute);
	});

	}
	$scope.selectAction = function(element) {
		var elmental = element;
		for (var i = 0; i < 10; i++)
		{
			var apples = 1;
		}
	}

});