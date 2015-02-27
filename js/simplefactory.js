//think of this as a class
app.factory('SimpleFactory', function($firebase)
{
  
  var factory = {};
  var url = "https://radiant-torch-6582.firebaseio.com/";
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

  factory.remove = function(id) {
	    var itemRef = new Firebase(url + '/' + id);
      itemRef.remove();
  };

  return factory;
})