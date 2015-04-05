app.controller('AdminCtrl', function($scope, $firebase, $http, $cookies, AuthFactory) {

   var authFactory = AuthFactory;
   authFactory.verifyAuthenticated();
   
	var url = "https://angle-that-box.firebaseio.com";
    var ref = new Firebase(url);

    var requiredFields = ["CULTURAL_SPACE_NAME","WEBSITE","TYPE","PRIMARY_USE","ADDRESS","LOCAL_AREA","OWNERSHIP",
	"SQUARE_FEET","NUMBER_OF_SEATS","ACTIVE_SPACE","LONGITUDE","LATITIUDE"]

	var locRef = ref.child("locations");
  var liRef = $firebase(ref.child("lastLocationsIndex")).$asObject();
  
  var index;


  liRef.$loaded().then(function(liRef) {
    index = parseInt(liRef.$value);
  });


	$scope.upload = function() {
    //check if admin
      var uid = $cookies.uid.split(":")[1];
      var userRef = new Firebase("https://angle-that-box.firebaseio.com/users/" + uid)
      userRef.once('value', function(snapshot) {
      if (!snapshot.hasChild("admin")) {
          alert("You do not have access");
          return;
      } else {
      
        //begin file parsing
        var data = null;
        var file = $("#csvfile")[0].files[0];

        if (file == undefined) {
  	      alert("Please choose a file");
  	      return
        }

  	  //begin reading csv file
        var filereader = new FileReader();
        filereader.readAsText(file);
        filereader.onload = function(event) {
            var csvData = event.target.result;
            var objs = $.csv.toObjects(csvData);
            
            //check if object has required fields
            var check = checkFields(objs[0]);
            if (check) {
  	          pushDataBegin(objs);
            }

          }
      }
    });
   }

   var checkFields = function(data) {
	   if (data == undefined) {
		   alert("No objects exist");
		   return false;

	   } else {
	   		//check that each field is present
		   for (s in requiredFields) {
			   if (!data.hasOwnProperty(requiredFields[s])) {
				   alert(requiredFields[s] + " field does not exist");
				   return false;
			   }
		   }

		   return true;
	   }
   }

   var pushDataBegin = function(newData) {
		var fbData = $firebase(locRef).$asArray();
		fbData.$loaded().then(function() {
			pushData(newData, fbData);
		})
   }

  var pushData = function(newData, fbData) {
    var allUploaded = true;

    newData.forEach(function(newItem) {
      var itemNotPresent = true;

      for (j in fbData) {
        if (fbData[j].CULTURAL_SPACE_NAME == newItem.CULTURAL_SPACE_NAME) {
          itemNotPresent = false;
          allUploaded = false;
          break;
        }
      }
      
      if (itemNotPresent) {
        newItem.LATITIUDE = parseFloat(newItem.LATITIUDE);
        newItem.LONGITUDE = parseFloat(newItem.LONGITUDE);
        index += 1;
        var key = "loc" + parseInt(index);
        locRef.child(key).set(newItem);
        ref.child("lastLocationsIndex").set(index);
        }
    })

    alert(getFinishMessage(allUploaded));
  }

  var getFinishMessage = function(allUploaded) {
    if (allUploaded) {
      return "All items have been uploaded.";
    } else {
      return "One or more duplicate items exist. Not all items have been uploaded."
    }

  }
   
   $scope.logout = function() {
      authFactory.logout();
   }

})