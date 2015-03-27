app.controller('DashboardCtrl', function($scope, $http, $firebase, $filter, DashboardFactory, MapFactory, WishlistFactory, FavouriteFactory) {

   var factory = DashboardFactory; //this is an instance of the factory
   var mapFactory = MapFactory;
   var fFactory = FavouriteFactory;
   var wFactory = WishlistFactory;
   $scope.list = factory.getList();
   $scope.checkboxes = []; //to keep track of which boxes are checked
   $scope.filterTypes = [{'value': '', 'name': ''}];


   //set all checkboxes to false at first, list is initially sorted by name
   $scope.list.$loaded().then(function() {
      $scope.list = $filter('orderBy')($scope.list, '+CULTURAL_SPACE_NAME');
      angular.forEach($scope.list,function (item){
      $scope.checkboxes.push({
         CULTURAL_SPACE_NAME:item.CULTURAL_SPACE_NAME,
         TYPE:item.TYPE,
         LATITUIDE:item.LATITUIDE,
         LONGITUDE:item.LONGITUDE,
         ADDRESS:item.ADDRESS,
         WEBSITE:item.WEBSITE,
         checked:false});
      });
   });
   
   //sort selections to reflect how they are sorted in the view 
   $scope.sort = function(selectedSortOrder) {
      $scope.checkboxes = $filter('orderBy')($scope.checkboxes, selectedSortOrder);
   }


   //filter selections to reflect how they are filtered in the view
   $scope.filtertype = function(searchTYPE) {
      $scope.search.CULTURAL_SPACE_NAME = "";
      filterLocations(searchTYPE);
   }

   //filter selections to reflect how they are filtered in the view
   $scope.filtername = function(searchCULTURAL_SPACE_NAME) {
      filterLocations(searchCULTURAL_SPACE_NAME);
   }

   var filterLocations = function(type) {
      $scope.checkboxes = $scope.list.slice();
      mapFactory.clearMarkers();
      $scope.checkboxes = $filter('filter')($scope.checkboxes, type);
      mapFactory.populateMap(map, $scope.checkboxes);
   }
   
   $scope.list.$loaded().then(function(){
         angular.forEach($scope.list, function(item){
            var currentItem = {'value': item.TYPE, 'name': item.TYPE};
            var index = $.grep($scope.filterTypes, 
               function(e){ 
                  var valeen = e['value'];
                  var c =  currentItem['value']
                  return e['value'] == currentItem['value'];
                   });
               if(index.length == 0 )
                  $scope.filterTypes.push(currentItem);
         });
      });


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

   //Create and populate map
   var map = mapFactory.createMap();
   $scope.list.$loaded().then(function() {
      mapFactory.populateMap(map, $scope.list);
   });

   //Open info window of location when item in locations list is clicked
   $scope.openInfoWindow = function(index) {
      mapFactory.openWindow(index, map);
   }
});