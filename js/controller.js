var app = angular.module('app', ['ngRoute', 'firebase']);

//configure the routes
app.config(function($routeProvider) {
  $routeProvider
	.when("/",
	   {
		  //each view is assigned a controller here
		  templateUrl: "views/main.html", 
	      controller: "SimpleCtrl"
	    }
	)
	.when("/createAccount",
	   {
		  templateUrl: "views/createAccount.html",
	      controller: "UserAccountCtrl"
	    }
	);
});

app.controller('SimpleCtrl', function($scope, $firebase, SimpleFactory) { //name is SimpleCtrl, the parameters are dependencies

   var sf = SimpleFactory; //this is an instance of the factory
   $scope.list = sf.getList(); //$scope is the link between the view and the controller ie scope = view, getList is a function of SimpleFactory
   //list is an element of scope, it can be defined here or in the view
   var test = sf.url;

   $scope.add = function(inp) { 
      if (inp != undefined && inp != "") {
         sf.addToList(inp);

         $scope.input = ""; //input is defined on line 4 of main.html
      }
   }

});

app.controller('UserAccountCtrl', function($scope, $firebase, UserFactory) {
   var factory = UserFactory; //instance of UserFactory
   $scope.list = factory.getUserList();

   $scope.add = function(email, password, name, birthDate) {
      //TODO: validate user input, check email not already registered
      if (email != undefined && email != "") {
         factory.addUser(email, password, name, birthDate);
      }
   }

});