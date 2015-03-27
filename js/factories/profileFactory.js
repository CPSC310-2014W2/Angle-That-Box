app.factory('ProfileFactory', function($firebase, $location)
{
   var factory = {};

   var url = "https://angle-that-box.firebaseio.com";

   var uRef = new Firebase(url);
   var currentUser = uRef.getAuth();
   var userID = currentUser.google.id;
   
   var ref = new Firebase(url + '/users/' + userID);
   var userData = $firebase(ref).$asObject();

   factory.getUserData = function() {
      return userData;

      var username = userData.name;
   };

   return factory;
})