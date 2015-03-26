app.factory('RoutesFactory', function($firebase, $location)
{
   var factory = {};

   var url = "https://angle-that-box.firebaseio.com";
   var uRef = new Firebase(url);
   var currentUser = uRef.getAuth();
   var userID = currentUser.google.id;

   var ref = new Firebase(url + '/favouriteLocations/' + userID + '/wishlist');
   var routes = $firebase(ref).$asArray();



   factory.getRoutes = function(list) {
      return routes
   };

   factory.getTheRoute = function(list, routes){
       var routeNames = []
      for(var i = 0; i <routes.length;i++){
         routeNames.push(routes[i].name);
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

   factory.add = function(item) {

      var routesSnap;
      var name = item.CULTURAL_SPACE_NAME;

      //routesSnap is data read at the routes location
      ref.once('value', function(dataSnapshot) {
         routesSnap = dataSnapshot;
      });

      //turns name into a valid firebase key
      var key = name.replace(/\.|\#|\$|\[|\]|\//g, ' ');

      //only add if there are no duplicates
      if (!routesSnap.hasChild(key)) {
         ref.child(key).set({"name":name});
         alert("Add Successful");
      } else {
         alert("Item is already in Routes");
      }
   };

   return factory;
})