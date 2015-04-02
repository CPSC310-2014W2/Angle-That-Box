app.controller('DashboardCtrl', function($scope, $filter, $http, AuthFactory, DashboardFactory, MapFactory, WishlistFactory, FavouriteFactory) {

   var authFactory = AuthFactory;
   authFactory.verifyAuthenticated();
   
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

   

   $scope.share = function(type) {
      var openWindow = mapFactory.getSelectedMarker();
      if (openWindow == undefined) {
         alert("Please select a location marker before sharing")
      } else {
         var loc = $scope.checkboxes[openWindow.index];

         if (type == "fbPost") {
            fbPost(loc);
         } else if (type == "tweet") {
            tweet(loc);
         }
           
      }
      
   }

   var tweet = function(loc) {
      var url = "https://twitter.com/share?url=google.com&text=" + "Check out this cultural space " + loc.CULTURAL_SPACE_NAME + 
      " " + loc.WEBSITE;
      window.open(url);
   }

   var fbPost = function(loc) {
      var website = loc.WEBSITE;
         if (website == "") {
            website = "google.ca" //to be replaced with firebase url
         }

      FB.ui(
            {
               method: 'feed',
               name: loc.CULTURAL_SPACE_NAME,
               link: website,
               caption: loc.CULTURAL_SPACE_NAME,
               description: 'Check out this cultural space I found from Outinglicious',
            },
               function(response) {
                  if (response && response.post_id) {
                     alert('Post was published.');
                  } else {
                     alert('Post was not published.');
               }
            }
         );
   }

   var parseData = function() {
      $http.get('data/CulturalSpaces.csv').success(function(data) {
         var objs = $.csv.toObjects(data);
         var locations = {};
         objs.forEach(function(item, i) {
            item.LATITIUDE = parseInt(item.LATITIUDE);
            item.LONGITUDE = parseInt(item.LONGITUDE);
            var key = "loc" + parseInt(i);
            locations[key] = item;
         })
      })
   }

});