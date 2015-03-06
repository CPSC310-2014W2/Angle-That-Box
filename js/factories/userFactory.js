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
            if (factory.userExists(authData.google.id) == false) {
               alert("User not registered with app");
            } else {
               console.log("User authenticated, logging in");
               factory.openDashboardView($scope);
            }
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
            if (factory.isNewUserValid(error, authData)) {
               console.log("Creating new user", authData.google.id);
               factory.addUser(authData.google.id, "google", name, birthDate);
               console.log("User successfully created, logging in");
               factory.openDashboardView($scope);
            }
         });
      }
   };
   
   factory.addUser = function(uid, authProvider, name, birthDate) {
      ref.child(uid).set({
         "name": name,
         "birthdate": birthDate.valueOf(),
         "authProvider": authProvider
      });
   }
   
   factory.isNewUserValid = function(error, authData) {
      if (error) {
         console.log("Login failed!", error);
      } else if (factory.userExists(authData.google.id)) {
         alert("Email already registered with app");
      } else {
         return true;
      }
      return false;
   }
   
   factory.userExists = function(uid) {
      ref.child(uid).once('value', function(data) {
         return data.val() != null;
      });
   }
   
   factory.openDashboardView = function($scope) {
      $location.path("/dashboard");
      $location.replace();
      $scope.$apply();
   }

   return factory;
})