app.controller('DashboardCtrl', function($scope, $firebase, DashboardFactory) {

   var factory = DashboardFactory;
   $scope.list = factory.getList();

   $scope.add = function(input) { 
      if (input != undefined && input != "") {
         factory.addToList(input);

         $scope.input = ""; //input is defined in dashboard.html
      }
   }
   
   $scope.logout = function() {
      factory.logout();
   }

});