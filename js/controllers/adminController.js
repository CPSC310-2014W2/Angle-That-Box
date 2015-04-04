app.controller('AdminCtrl', function($scope) {

	var requiredFields = ["CULTURAL_SPACE_NAME","WEBSITE","TYPE","PRIMARY_USE","ADDRESS","LOCAL_AREA","OWNERSHIP",
	"SQUARE_FEET","NUMBER_OF_SEATS","ACTIVE_SPACE","LONGITUDE","LATITIUDE"]

	$scope.upload = function() {
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
	          console.log("Uploading file");
          }

      }
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

   var parseData = function() {
      $http.get('data/CulturalSpaces.csv').success(function(data) {
         var objs = $.csv.toObjects(data);
         var locations = {};
         objs.forEach(function(item, i) {
            item.LATITIUDE = parseInt(item.LATITIUDE);
            item.LONGITUDE = parseInt(item.LONGITUDE);
            var key = "loc" + parseInt(i);
            locations[key] = item;
         })
      })
   }
})