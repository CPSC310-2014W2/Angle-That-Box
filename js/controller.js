var app = angular.module('app', ['ngRoute', 'firebase']);

//configure the routes
app.config(function($routeProvider) {
   //each view is assigned a controller here
   $routeProvider
   .when("/",
         {
            templateUrl: "views/main.html",
            controller: "UserAccountCtrl"
         }
      )
   .when("/dashboard",
         {
            templateUrl: "views/dashboard.html",
            controller: "DashboardCtrl"
         }
   )
   .when("/createAccount",
         {
            templateUrl: "views/createAccount.html",
            controller: "UserAccountCtrl"
         }
   );
});

app.controller('DashboardCtrl', function($scope, $firebase, DashboardFactory) { //name is SimpleCtrl, the parameters are dependencies

   var factory = DashboardFactory; //this is an instance of the factory
   $scope.list = factory.getList(); //$scope is the link between view and controller, getList is a function of DashboardFactory

   $scope.add = function(input) { 
      if (input != undefined && input != "") {
         factory.addToList(input);

         $scope.input = ""; //input is defined in dashboard.html
      }
   }
   
   $scope.logout = function() {
      factory.logout($scope, $auth);
   }

});

app.controller('UserAccountCtrl', function($scope, $firebase, UserFactory) {
   var factory = UserFactory; //instance of UserFactory
   $scope.list = factory.getUserList();

   $scope.loginWithGoogle = function() {
      factory.loginWithGoogle($scope);
   }
   
   $scope.add = function(name, birthDate) {
      factory.addUser($scope, name, birthDate);
   }

});