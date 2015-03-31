app.controller("ProfileController", function($scope, $firebase, AuthFactory, ProfileFactory) {


   var authFactory = AuthFactory;
   authFactory.verifyAuthenticated();

   var factory = ProfileFactory; 
   $scope.userData = factory.getUserData();

   $scope.logout = function() {
      authFactory.logout();
   }

});

