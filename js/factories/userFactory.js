app.factory('UserFactory', function($firebase, $location)
{
   var factory = {};
   var url = "https://angle-that-box.firebaseio.com/users";
   var ref = new Firebase(url);
   
   factory.loginWithGoogle = function($scope) {
      ref.authWithOAuthPopup("google", function(error, authData) {
         if (error) {
            console.log("Login failed", error);
         } else {
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

   factory.addUserWithGoogleAuth = function($scope, name, birthDate) {
      if (name == undefined || name == "") {
         alert("Please enter a name");
      } else if (birthDate == undefined || birthDate == "") {
         alert("Please enter a birthdate");
      } else {
         ref.authWithOAuthPopup("google", function(error, authData) {
            if (error) {
               console.log("Google authentication failed");
            } else {
               factory.addUserIfDoesNotExist($scope, authData.google.id, name, birthDate);
            }
         });
      }
   };
   
   factory.addUserIfDoesNotExist = function($scope, uid, name, birthDate) {
      ref.child(uid).once('value', function(data) {
         if (data.val() !== null) {
            alert("Email already registered with app");
         } else {
            console.log("Creating new user", uid);
            factory.addUser(uid, "google", name, birthDate);
            console.log("User created, logging in");
            factory.openDashboardView($scope);
         }
      });
   }
   
   factory.addUser = function(uid, authProvider, name, birthDate) {
      ref.child(uid).set({
         "name": name,
         "birthdate": birthDate.valueOf(),
         "authProvider": authProvider
      });
   }
   
   factory.openDashboardView = function($scope) {
      $location.path("/dashboard");
      $location.replace();
      $scope.$apply();
   }

   return factory;
})