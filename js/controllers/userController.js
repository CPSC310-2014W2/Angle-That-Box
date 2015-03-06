app.controller('UserAccountCtrl', function($scope, $firebase, UserFactory) {
   var factory = UserFactory;

   $scope.loginWithGoogle = function() {
      factory.loginWithGoogle($scope);
   }
   
   $scope.createAccountWithGoogleAuth = function(name, birthDate) {
      factory.addUserWithGoogleAuth($scope, name, birthDate);
   }

});