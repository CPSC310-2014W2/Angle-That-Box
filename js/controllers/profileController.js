app.controller("ProfileController", function($scope, $firebase, AuthFactory, ProfileFactory) {


   var authFactory = AuthFactory;
   authFactory.verifyAuthenticated();

   var factory = ProfileFactory; 
   $scope.userData = factory.getUserData();

   $scope.logout = function () {
      authFactory.logout();
   }

   $scope.uploadPhoto = function (selectedFile) {

     // get the first image 
     if (selectedFile.files && selectedFile.files[0]) {
            var filereader = new FileReader();

            // image is restricted to 150x150 square
            filereader.onload = function (e) {
                $('#imageID')
                    .attr('src', e.target.result)
                    .width(150)
                    .height(150);
            };

            // URl for the image
            filereader.readAsDataURL(selectedFile.files[0]);
        }
  }


});

