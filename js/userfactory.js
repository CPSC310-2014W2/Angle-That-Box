app.factory('UserFactory', function($firebase, $location)
{
   var factory = {};
   var url = "https://angle-that-box.firebaseio.com/users";
   var ref = new Firebase(url);
   var userList = $firebase(ref).$asArray();
   
   factory.loginWithGoogle = function($scope) {
      ref.authWithOAuthPopup("google", function(error, authData) {
         if (error) {
            console.log("Login Failed!", error);
         } else {
            $location.path("/dashboard");
            $location.replace();
            $scope.$apply();
         }
      });
   }

   factory.getUserList = function() {
      return userList;
   };

   factory.addUser = function(email, password, name, birthDate) {
      //TODO: check if user already registered
      userList.$add({"birthdate": birthDate.valueOf(), "email": email, "name": name});
   };

   return factory;
})