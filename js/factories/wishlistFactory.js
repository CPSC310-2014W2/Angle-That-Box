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

      ref.once('value', function(dataSnapshot) {
         wishlistSnap = dataSnapshot;
      });

      if (!wishlistSnap.hasChild(name)) {
         ref.child(name).set({"name":name});
         alert("Add Successful");
      } else {
         alert("Item is already in Wishlist");
      }
   };

   return factory;
})