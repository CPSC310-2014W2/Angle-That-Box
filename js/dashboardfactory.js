//think of this as a class
app.factory('DashboardFactory', function($firebase, $location)
{
  
  var factory = {};
  var url = "https://angle-that-box.firebaseio.com/";
  var ref = new Firebase(url);
  var listOfItems = $firebase(ref).$asArray();

  factory.getList = function() {
	  return listOfItems;
  };

  factory.addToList = function(item) {
	  if ($.inArray(item, listOfItems) == -1) {
      listOfItems.$add({name: item});
	  } 
	  else {
	  	alert("Item is already in list");
	  }
  };
  
  factory.logout = function($scope, $auth) {
     console.log("Logging out");
     ref.unauth();
     auth.logout();
     $location.path("/#");
     $location.replace();
     scope.$apply();
  }

  return factory;
})