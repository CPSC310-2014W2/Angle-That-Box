app.controller("RoutesController", function($scope, $firebase, RoutesFactory, MapFactory, DashboardFactory) {

	var factory = DashboardFactory;
	var rfactory = RoutesFactory;
	var mapFactory = MapFactory; 

	$scope.routeLocations = rfactory.getRouteLocations();
	$scope.orderSelect = [];
	$scope.routeOrder = [];
	$scope.markers = []; //storing markers for reference
	var routeCreated = false;

	$scope.routeLocations.$loaded().then(function(){
		$scope.orderSelect = RoutesFactory.getPriorityOptions($scope.routeLocations);
	})

	$scope.list = factory.getList(); 


	var map = mapFactory.createMap();
	$scope.list.$loaded().then(function() {
      mapFactory.populateMap(map, RoutesFactory.getTheRoute($scope.list, $scope.routeLocations));
  	});


	$scope.createRoute = function() {
		if(!rfactory.validRouteLength($scope.routeLocations))
		{
			alert('need at least 2 locations');
		} else
		{
			routeCreated = true;
			$scope.list.$loaded().then(function() {
				var routeToRoute = RoutesFactory.getTheRouteSorted($scope.list, $scope.routeLocations);
				mapFactory.clearMarkers();
				mapFactory.createRoute(routeToRoute);
			});
		}
	}

	$scope.removeRouteMarker = function(index){
		$scope.routeLocations.$remove(index).then(function(){
			$scope.orderSelect = RoutesFactory.getPriorityOptions($scope.routeLocations);
			if(routeCreated && rfactory.validRouteLength($scope.routeLocations))
			{
				$scope.createRoute();
			} else {
				mapFactory.clearMarkers();
				$scope.list.$loaded().then(function() {
     				mapFactory.populateMap(map, RoutesFactory.getTheRoute($scope.list, $scope.routeLocations));
  				});
			}
		})
	}

});