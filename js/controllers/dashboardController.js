app.controller('DashboardCtrl', function($scope, $http, $firebase, $filter, DashboardFactory, MapFactory, WishlistFactory, FavouriteFactory) { //name is SimpleCtrl, the parameters are dependencies

   var factory = DashboardFactory; //this is an instance of the factory
   var mapFactory = MapFactory;
   var fFactory = FavouriteFactory;
   var wFactory = WishlistFactory;
   $scope.list = factory.getList(); //$scope is the link between view and controller, getList is a function of DashboardFactory
   $scope.markers = []; //storing markers for reference
   $scope.checkboxes = []; //to keep track of which boxes are checked

   $scope.list.$loaded().then(function() {
      $scope.list = $filter('orderBy')($scope.list, '+CULTURAL_SPACE_NAME');
      angular.forEach($scope.list,function (item){
      $scope.checkboxes.push({
         CULTURAL_SPACE_NAME:item.CULTURAL_SPACE_NAME,
         TYPE:item.TYPE,
         checked:false});
      });
      
   });

   $scope.sort = function(selectedSortOrder) {
      if (selectedSortOrder == '+CULTURAL_SPACE_NAME') {
      $scope.checkboxes = $filter('orderBy')($scope.checkboxes, '+CULTURAL_SPACE_NAME');
      } else {
      $scope.checkboxes = $filter('orderBy')($scope.checkboxes, '-TYPE');
      }
   }
   
   $scope.unCheckAll = function() {
   angular.forEach($scope.checkboxes, function (item) {
            item.checked = false;
        });
   }

   $scope.addFavourites = function() { 
      angular.forEach($scope.checkboxes, function (item){
         if (item.checked) 
            fFactory.add(item);
      });
      $scope.unCheckAll();
   }

   $scope.addWishlist = function() { 
       angular.forEach($scope.checkboxes, function (item) {
         if (item.checked) 
            wFactory.add(item);
      });
      $scope.unCheckAll();
   }

   $scope.logout = function() {
	   factory.logout();
   }

   var map = mapFactory.createMap();

   $scope.list.$loaded().then(function() {
      mapFactory.getMapData(map, $scope.list, $scope.markers);
   });

});