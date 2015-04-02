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
   };

   factory.savePhoto = function(photo) {
      ref.child("photo").set(photo);
   };

   factory.getPhoto = function () {
      var userSnap;
      
      ref.once('value', function(dataSnapshot) {
         userSnap = dataSnapshot;
      });

      //if there is no profile picture uploaded then show the default
      if (!userSnap.hasChild("photo")) {
            return true;
         } else { 
            return false; 
         }

   };

   factory.delete = function () {
      picref = new Firebase(ref + "/photo");
      picref.remove();
   }

   return factory;
})