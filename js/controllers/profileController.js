app.controller("ProfileController", function($scope, $firebase, AuthFactory, ProfileFactory) {


   var authFactory = AuthFactory;
   authFactory.verifyAuthenticated();

   var factory = ProfileFactory; 
   $scope.userData = factory.getUserData();

   //after getting the userData show either their pic or the default pic if they don't have one uploaded
   $scope.userData.$loaded().then(function() {
      $scope.profilePhoto = factory.getPhoto();
   });


   $scope.logout = function () {
      authFactory.logout();
   }

   $scope.uploadPhoto = function (selectedFile) {
     // set to false so ng-hide on img element shows the uploaded picture
     $scope.profilePhoto = false;

     // get the first image 
     if (selectedFile.files && selectedFile.files[0]) {
            var filereader = new FileReader();

            // set the src, image is fit to 210x210 square
            filereader.onload = function (event) {  

              // save image as base64 string so we can save it in Firebase 
              $scope.profileIMG = event.target.result;
            
                $('#imageID')
                    .attr('src', event.target.result)
                    .width(210)
                    .height(210);


              factory.savePhoto($scope.profileIMG);

            };

            //URL for the image
            filereader.readAsDataURL(selectedFile.files[0]);
        }
    }

    $scope.deletePhoto = function () {
      if (confirm('Are you sure you want to delete your photo?')) {
        factory.delete();
        //show the default photo after deleting your pic
        $scope.profilePhoto = true;
      } 
    }

});

