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
  	factory.saveName($scope.name);
  	factory.saveLocation($scope.location);
  	factory.saveBio($scope.bio);
  	$scope.name = null;
  	$scope.location = null;
  	$scope.bio = null;
  	alert("Your changes have been saved!");
  }

  }
);