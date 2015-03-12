app.controller("FavouriteController", function($scope, $firebase, FavouriteFactory) {

  var factory = FavouriteFactory; 
  $scope.favourites = factory.getFavourites();
    
  $scope.delete = function(index) {
	 $scope.favourites.$remove(index);
    }
    
  }
);