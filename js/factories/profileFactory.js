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

   factory.convertBirthday = function () {
      var bday = new Date(userData.birthdate);
      var year = bday.getFullYear();

      var month = new Array();
         month[0] = "January";
         month[1] = "February";
         month[2] = "March";
         month[3] = "April";
         month[4] = "May";
         month[5] = "June";
         month[6] = "July";
         month[7] = "August";
         month[8] = "September";
         month[9] = "October";
         month[10] = "November";
         month[11] = "December";

      var monthFull = month[bday.getMonth()];
      var day = bday.getDate();
      userData.birthdate = (monthFull +" "+ day +" "+ year);

      ref.child("birthdate").set(userData.birthdate);
   }

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
      ref.child("photo").remove();
   }

   return factory;
})