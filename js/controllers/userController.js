app.controller('UserAccountCtrl', function($scope, $firebase, UserFactory) {
   var factory = UserFactory; //instance of UserFactory
   $scope.list = factory.getUserList();

   $scope.loginWithGoogle = function() {
      factory.loginWithGoogle($scope);
   }
   
   $scope.add = function(email, password, name, birthDate) {
      //TODO: validate user input, check email not already registered
      if (email != undefined && email != "") {
         factory.addUser(email, password, name, birthDate);
      }
   }

});