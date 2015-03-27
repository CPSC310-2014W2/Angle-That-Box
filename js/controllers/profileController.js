app.controller("ProfileController", function($scope, $firebase, ProfileFactory) {

  var factory = ProfileFactory; 
  $scope.userData = factory.getUserData();
  
  }
);