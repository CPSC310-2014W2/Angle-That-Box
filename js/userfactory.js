app.factory('UserFactory', function($firebase)
{
   var factory = {};
   var url = "https://angle-that-box.firebaseio.com/users";
   var ref = new Firebase(url);
   var userList = $firebase(ref).$asArray();
   
   factory.loginWithGoogle = function() {
      ref.authWithOAuthPopup("google", function(error, authData) {
         if (error) {
            console.log("Login Failed!", error);
         } else {
            console.log("Authenticated successfully with payload:", authData);
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