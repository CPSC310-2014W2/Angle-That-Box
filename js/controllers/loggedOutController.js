app.controller('LoggedOutCtrl', function($scope, CreateAccountFactory, LoginFactory) {
   var loginFactory = LoginFactory;
   var createAcctFactory = CreateAccountFactory;

   $scope.loginWithGoogle = function() {
      loginFactory.loginWithGoogle($scope);
   }
   
   $scope.createAccountWithGoogleAuth = function(name, birthDate) {
      createAcctFactory.addUserWithGoogleAuth($scope, name, birthDate);
   }

});