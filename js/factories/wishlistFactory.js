app.factory('WishlistFactory', function($firebase, $location)
{
   var factory = {};

   var url = "https://angle-that-box.firebaseio.com";
   var uRef = new Firebase(url);
   var currentUser = uRef.getAuth();
   var userID = currentUser.google.id;

   var ref = new Firebase(url + '/favouriteLocations/' + userID + '/wishlist');
   var wishlist = $firebase(ref).$asArray();

   factory.getWishlist = function() {
      return wishlist;
   };

   factory.add = function(item) {

      var wishlistSnap;
      var name = item.CULTURAL_SPACE_NAME;

      //wishlistSnap is data read at the wishlist location
      ref.once('value', function(dataSnapshot) {
         wishlistSnap = dataSnapshot;
      });

      //turns name into a valid firebase key
      var key = name.replace(/\.|\#|\$|\[|\]|\//g, ' ');

      //only add if there are no duplicates
      if (!wishlistSnap.hasChild(key)) {
         ref.child(key).set({"name":name});
         alert("Add Successful");
      } else {
         alert("Item is already in Wishlist");
      }
   };

   return factory;
})