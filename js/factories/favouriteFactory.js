app.factory('FavouriteFactory', function($firebase, $location)
{
   var factory = {};
   //var url = "https://angle-that-box.firebaseio.com";
   //var userName = user1 //need to get current userName?;
   //var ref = new Firebase(url + '/favouriteLocations/' + userName + '/favourites');
   var ref = new Firebase("https://dazzling-torch-7261.firebaseio.com/favouriteLocations/user1/favourites");
   var favourites = $firebase(ref).$asArray();

   factory.getfavourites = function() {
      return favourites;
   };

   factory.add = function(item) {
      if ($.inArray(item, favourites) == -1) {
         ref.push(item);
         alert("Add Successful");
      } else {
         alert("Item is already in Favourites");
      }
   };

   return factory;
})