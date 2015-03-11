app.factory('FavouriteFactory', function($firebase, $location)
{
   var factory = {};
   var url = "https://angle-that-box.firebaseio.com";
   var uRef = new Firebase(url);
   var currentUser = uRef.getAuth();
   var userID = currentUser.google.id;
   var ref = new Firebase(url + '/favouriteLocations/' + userID + '/favourites');
   var favourites = $firebase(ref).$asArray();

   factory.getfavourites = function() {
      return favourites;
   };

   factory.add = function(item) {

      var favlistSnap;
      var name = item.name;

      ref.once('value', function(dataSnapshot) {
         favlistSnap = dataSnapshot;
      });

      if (!favlistSnap.hasChild(name)) {
         ref.child(name).set(name);
         alert("Add Successful");
      } else {
         alert("Item is already in Favourites");
      }
   };

   return factory;
})