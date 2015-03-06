app.factory('UserFactory', function($firebase, $location)
{
   var factory = {};
   var url = "https://angle-that-box.firebaseio.com/users";
   var ref = new Firebase(url);
   var userList = $firebase(ref).$asArray();
   
   factory.loginWithGoogle = function($scope) {
      ref.authWithOAuthPopup("google", function(error, authData) {
         if (error) {
            console.log("Login failed", error);
         } else {
            if (factory.userExists(authData.google.id) == false) {
               console.log("User not registered with app");
               alert("User not registered with app");
            } else {
               console.log("User authenticated, logging in");
               $location.path("/dashboard");
               $location.replace();
               $scope.$apply();
            }
         }
      });
   }
   
   factory.getUserList = function() {
      return userList;
   };

   factory.addUser = function($scope, name, birthDate) {
      ref.authWithOAuthPopup("google", function(error, authData) {
         if (error) {
            console.log("Login failed!", error);
         } else if (factory.userExists(authData.google.id)) {
            console.log("Email already registered with app");
         } else {
            factory.addUser(authData.google.id, "", name, birthDate);
            console.log("User successfully created, logging in");
            //TODO: log in
         }
      });
   };
   
   factory.addUser = function(uid, email, name, birthDate) {
      if (!factory.userExists(uid)) {
         ref.child(uid).set({
            "email": email, 
            "name": name, 
            "birthdate": birthDate.valueOf()
         });
      }
   }
   
   factory.userExists = function(uid) {
      ref.child(uid).once('value', function(data) {
         return data.val() != null;
      });
   }
   
   factory.isValidNewUserData = function(name) {
      return name != undefined && name != "";
   }

   return factory;
})