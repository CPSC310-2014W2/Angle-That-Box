app.controller("WishlistController", function($scope, $firebase, WishlistFactory) {

  var factory = WishlistFactory; 
  $scope.wishlist = factory.getWishlist();
    
  $scope.delete = function(index) {
	 $scope.wishlist.$remove(index);
    }
    
  }
);