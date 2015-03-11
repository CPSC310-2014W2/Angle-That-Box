app.factory('WishlistFactory', function($firebase, $location)
{
   var factory = {};
   //var url = ""https://angle-that-box.firebaseio.com"";
   //var userName = user1 //need to get current userName?;
   //var ref = new Firebase(url + '/favouriteLocations/' + userName + '/wishlist');
   var ref = new Firebase("https://dazzling-torch-7261.firebaseio.com/favouriteLocations/user1/wishlist");
   var wishlist = $firebase(ref).$asArray();

   factory.getWishlist = function() {
      return wishlist;
   };

   factory.add = function(item) {
      if ($.inArray(item, wishlist) == -1) {
         wishlist.push({name:item.CULTURAL_SPACE_NAME});
         alert("Add Successful");
      } else {
         alert("Item is already in Wishlist");
      }
   };

   return factory;
})