app.factory('LoginFactory', function($firebase, $location, $cookies)
{
   var factory = {};
   var url = "https://angle-that-box.firebaseio.com/users";
   var ref = new Firebase(url);
   
   factory.loginWithGoogle = function($scope) {
      ref.authWithOAuthPopup("google", function(error, authData) {
         if (error) {
            console.log("Login failed", error);
         } else {
            $cookies.uid = authData.uid;
            factory.loginIfUserExists($scope, authData.google.id);
         }
      });
   }
   
   factory.loginIfUserExists = function($scope, uid) {
      ref.child(uid).once('value', function(data) {
         if (data.val() === null) {
            alert("User not registered with app");
         } else {
            console.log("User authenticated, logging in");
            factory.openDashboardView($scope);
         }
      });
   }

   factory.openDashboardView = function($scope) {
      $location.path("/dashboard");
      $location.replace();
      $scope.$apply();
   }
   
   return factory;
})