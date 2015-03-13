app.factory('FavouriteFactory', function($firebase, $location)
{
   var factory = {};

   var url = "https://angle-that-box.firebaseio.com";
   var uRef = new Firebase(url);
   var currentUser = uRef.getAuth();
   var userID = currentUser.google.id;
   
   var ref = new Firebase(url + '/favouriteLocations/' + userID + '/favourites');
   var favourites = $firebase(ref).$asArray();

   factory.getFavourites = function() {
      return favourites;
   };

   factory.add = function(item) {

      var favSnap;
      var name = item.CULTURAL_SPACE_NAME;

      //favSnap is data read at the favourites location
      ref.once('value', function(dataSnapshot) {
         favSnap = dataSnapshot;
      });

      //turns name into a valid firebase key
      var key = name.replace(/\.|\#|\$|\[|\]|\//g, ' ');

      //only add if there are no duplicates
      if (!favSnap.hasChild(key)) {
         ref.child(key).set({"name":name});
         alert("Add Successful");
      } else {
         alert("Item is already in Favourites");
      }
   };

   return factory;
})