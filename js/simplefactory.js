//think of this as a class
app.factory('SimpleFactory', function($firebase)
{
  
  var factory = {};
  var url = "https://angle-that-box.firebaseio.com/";
  var ref = new Firebase(url);
  var listOfItems = $firebase(ref).$asArray();

  factory.getList = function() {
	  return listOfItems;
  };

  factory.addToList = function(item) {
	  if ($.inArray(item, listOfItems) == -1) { //this line is just jquery
		  // listOfItems.push(item);
      listOfItems.$add({name: item});
	  } 
	  else {
	  	alert("Item is already in list");
	  }
  };

  return factory;
})