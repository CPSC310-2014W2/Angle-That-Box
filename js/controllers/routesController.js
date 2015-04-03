app.controller("RoutesController", function($scope, $firebase, RoutesFactory, MapFactory, DashboardFactory) {

	var factory = DashboardFactory;
	var rfactory = RoutesFactory;
	var mapFactory = MapFactory; 

	$scope.routes = rfactory.getRoutes();
	$scope.orderSelect = [];
	$scope.routeOrder = [];
	$scope.markers = []; //storing markers for reference
	var routeCreated = false;

	$scope.routes.$loaded().then(function(){
		$scope.orderSelect = RoutesFactory.getSelectable($scope.routes);
	})

	$scope.list = factory.getList(); 


	var map = mapFactory.createMap();
	$scope.list.$loaded().then(function() {
      mapFactory.populateMap(map, RoutesFactory.getTheRoute($scope.list, $scope.routes));
  	});


	$scope.createRoute = function() {
		if($scope.routes.length <= 1)
		{
			alert('cannot route 1 marker');
		} else
		{
			routeCreated = true;
			$scope.list.$loaded().then(function() {
			var routeToRoute = RoutesFactory.getTheRouteSorted($scope.list, $scope.routes);
			mapFactory.clearMarkers();
			mapFactory.createRoute(routeToRoute);
			});
		}
	}

	$scope.removeRouteMarker = function(index){
		$scope.routes.$remove(index).then(function(){

			$scope.orderSelect = RoutesFactory.getSelectable($scope.routes);
			if(routeCreated && $scope.routes.length > 1)
			{
				$scope.createRoute();
			} else {
				$scope.list.$loaded().then(function() {
     				mapFactory.populateMap(map, RoutesFactory.getTheRoute($scope.list, $scope.routes));
  				});
			}
		})
	}

});