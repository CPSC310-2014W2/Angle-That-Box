app.factory('EditFactory', function($firebase, $location)
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
   };

   factory.saveName = function(name) {
      ref.child("name").set(name);
   }

   factory.saveLocation = function(location) {
      ref.child("location").set(location);
   }

   factory.saveBio = function(bio) {
      ref.child("bio").set(bio);
   }

   return factory;
})