app.controller('DashboardCtrl', function($scope, $filter, $http, AuthFactory, DashboardFactory, MapFactory, RoutesFactory, FavouriteFactory, SocialMediaFactory) {

   var authFactory = AuthFactory;
   authFactory.verifyAuthenticated();
   
   var factory = DashboardFactory;
   var mapFactory = MapFactory;
   var fFactory = FavouriteFactory;
   var rFactory = RoutesFactory;
   $scope.list = factory.getList();
   $scope.checkboxes = []; //to keep track of which boxes are checked
   $scope.filterTypes = [{'value': '', 'name': ''}];
   $scope.favourites = fFactory.getFavourites();

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
         checked:false,
         Heart:false});
      });
      $scope.getFavourites();
   });

   //populate the page with your likes already marked
   $scope.getFavourites = function() {
     $scope.favourites = fFactory.getFavourites();
     $scope.favourites.$loaded().then(function() {
      angular.forEach ($scope.checkboxes, function (item) {
        angular.forEach ($scope.favourites, function (favourite) {
            if (item.CULTURAL_SPACE_NAME == favourite.CULTURAL_SPACE_NAME) 
                  item.Heart = true;
        });
    });
   });
     
   };

   $scope.like = function (index) {
      $scope.checkboxes[index].Heart = !$scope.checkboxes[index].Heart;
   }

   $scope.add = function (index) {
     var n = $scope.checkboxes[index].CULTURAL_SPACE_NAME; 
     var exists = false;

     // check if the space is in your favourites to know if we're liking or unliking
     angular.forEach ($scope.favourites, function (favourite) {
         if (favourite.CULTURAL_SPACE_NAME == n) 
               exists = true;
        });

      // if its in favourites we must be unliking so delete it, otherwise we must be liking so add it
      if (exists == true){
            fFactory.delete($scope.checkboxes[index]); 
      } else {
         fFactory.add($scope.checkboxes[index]);
      }
   }

   //filter selections to reflect how they are filtered in the view
   $scope.filtertype = function(searchTYPE) {
      $scope.search.CULTURAL_SPACE_NAME = "";
      filterLocations(searchTYPE);
      $scope.getFavourites();
   }

   //filter selections to reflect how they are filtered in the view
   $scope.filtername = function(searchCULTURAL_SPACE_NAME) {
      filterLocations(searchCULTURAL_SPACE_NAME);
      $scope.getFavourites();
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

   $scope.addRoute = function() { 
       angular.forEach($scope.checkboxes, function (item) {
         if (item.checked) 
            rFactory.add(item);
      });
      $scope.unCheckAll();
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

   $scope.logout = function() {
      authFactory.logout();
   }

   //used for facebook posts and tweets, takes string parameters "fbPost" or "tweet"
   $scope.share = function(type) {
      var smfact = SocialMediaFactory;
      var openWindow = mapFactory.getSelectedMarker();
      if (openWindow == undefined) {
         alert("Please select a location marker before sharing")
      } else {
         var loc = $scope.checkboxes[openWindow.index];
         if (type == "fbPost") {
            smfact.fbPost(loc);
         } else if (type == "tweet") {
            smfact.tweet(loc);
         }
      }
   }

});