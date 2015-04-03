app.controller("EditController", function($scope, $firebase, AuthFactory, EditFactory) {

  var authFactory = AuthFactory;
  authFactory.verifyAuthenticated();

  var factory = EditFactory; 
  $scope.userData = factory.getUserData();
  $scope.name;
  $scope.location;
  $scope.bio;

  $scope.logout = function () {
    authFactory.logout();
   }

  $scope.updateName = function (name) {
  	$scope.name = name;
  }

  $scope.updateLocation = function (location) {
  	$scope.location = location;
  }

  $scope.updateBio = function (bio) {
  	$scope.bio = bio;
  }

  $scope.saveName = function () {
  	factory.saveName($scope.name);
  	$scope.name = null;
  	alert("Your name has been saved!");
  }

  $scope.saveLocation = function () {
  	factory.saveLocation($scope.location);
  	$scope.location = null;
  	alert("Your location has been saved!");
  }

  $scope.saveBio = function () {
  	factory.saveBio($scope.bio);
  	$scope.bio = null;
  	alert("Your bio has been saved!");

  }

  $scope.saveAll = function () {
    if($scope.name != null) {
  	 factory.saveName($scope.name);
     $scope.name = null;
    }

    if($scope.location != null) {
     factory.saveLocation($scope.location);
     $scope.location = null;
    }

    if($scope.bio != null) {
     factory.saveBio($scope.bio);
     $scope.bio = null;
    }
    
  	alert("Your changes have been saved!");
  }

   $scope.cancelEdit = function () {
      if (confirm('Are you sure you want to Cancel? Any unsaved changes will be lost.')) {
        a = document.getElementById("cancelbtn");
        a.setAttribute("href", "#/profile");
      }
      //otherwise stay on page
    }

  }
);