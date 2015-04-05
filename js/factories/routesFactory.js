app.factory('RoutesFactory', function($firebase, $location)
{
   var factory = {};

   var url = "https://angle-that-box.firebaseio.com";
   var uRef = new Firebase(url);
   var currentUser = uRef.getAuth() || {"google" : google};
   var userID = currentUser.google.id;
   var ref = new Firebase(url + '/favouriteLocations/' + userID + '/wishlist');
   var routeLocations = $firebase(ref).$asArray();



   factory.getRouteLocations = function() {
      return routeLocations
   };

   factory.getPriorityOptions = function(route) {
      var select = [];
      for (var i = 0; i < route.length; i++)
         select.push({
            name: i + 1,
            value: i});
      return select;
   }

   factory.getTheRoute = function(list, routeLocations){
      var routeNames = []

      for(var i = 0; i <routeLocations.length;i++){
         routeNames.push(routeLocations[i].name);
      }
      var retArray = [];
      for (var i = 0; i < list.length ; i++){
         var culturalSpaceName = list[i].CULTURAL_SPACE_NAME;
         if ($.inArray(culturalSpaceName, routeNames) > -1){
            retArray.push(list[i]);
         }
      }


      return retArray;
   }

   factory.getTheRouteSorted = function(list,routeLocations){
      return this.sortRoute(this.getTheRoute(list,routeLocations),routeLocations);
   }

   factory.sortRoute = function(list, routeLocations){
      var routeSorted = this.sortRouteByPriority(routeLocations);
      var sortedList = [];
      for(var i = 0; i < routeSorted.length;i++){

         var itemInList = $.grep(list, function(e){
            return e.CULTURAL_SPACE_NAME == routeSorted[i].name;
         });
         if (itemInList.length > 0){
            sortedList.push(itemInList[0]);
         }
      }
      return sortedList;
   }

   factory.sortRouteByPriority = function(routeLocations)
   {
      var sortedRoute = routeLocations;
      var swapped = true;
      var size = sortedRoute.length;
      while (swapped)
      {
         swapped = false;
         for (var i = 1; i <size;i++)
         {
            if(sortedRoute[i - 1].$priority > sortedRoute[i].$priority){
               var temp = routeLocations[i -1];
               sortedRoute[i - 1] = sortedRoute[i];
               sortedRoute[i] = temp;
               swapped = true;
            }
         }
         size = size - 1;  
      }

      return sortedRoute;
   }

   factory.validRouteLength = function(route){
      //can only create a route with more than 1 location
      return route.length > 1; 
   }

   factory.add = function(item) {

      var routesSnap;
      var name = item.CULTURAL_SPACE_NAME;


      //routesSnap is data read at the routes location
      ref.once('value', function(dataSnapshot) {
         routesSnap = dataSnapshot;
      });

      //turns name into a valid firebase key
      var key = name.replace(/\.|\#|\$|\[|\]|\//g, ' ');

      //Google API limitation, route can only have 10 locations in it
      if (routesSnap.numChildren() > 10){
         alert("Route capacity reached, I'm sorry Reginal");
      //only add if there are no duplicates
      } else if (!routesSnap.hasChild(key)) {
         ref.child(key).set({"name":name});
         alert("Add Successful");
      } else {
         alert("Item is already in Route");
      }
   };

   return factory;
})