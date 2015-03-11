app.factory('DashboardFactory', function($firebase, $location)
{
   var factory = {};
   var url = "https://angle-that-box.firebaseio.com/locations";
   var ref = new Firebase(url);
   var listOfItems = $firebase(ref).$asArray();

   factory.getList = function() {
      return listOfItems;
   };
   
   factory.logout = function() {
      console.log("Logging out");
      ref.unauth();
      $location.path("/");
   }

   return factory;
})