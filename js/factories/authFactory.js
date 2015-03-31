app.factory('AuthFactory', function($firebase, $location)
{
   var factory = {};
   var url = "https://angle-that-box.firebaseio.com/users";
   var ref = new Firebase(url);
   
   factory.verifyAuthenticated = function() {
      if (ref.getAuth() == null) {
         console.log("User not authenticated");
         $location.path("/");
      }
   }
   
   factory.logout = function() {
      console.log("Logging out");
      ref.unauth();
      $location.path("/");
   }

   return factory;
})
