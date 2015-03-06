app.controller('DashboardCtrl', function($scope, $firebase, DashboardFactory) { //name is SimpleCtrl, the parameters are dependencies

   var factory = DashboardFactory; //this is an instance of the factory
   $scope.list = factory.getList(); //$scope is the link between view and controller, getList is a function of DashboardFactory

   $scope.add = function(input) { 
      if (input != undefined && input != "") {
         factory.addToList(input);

         $scope.input = ""; //input is defined in dashboard.html
      }
   }

});