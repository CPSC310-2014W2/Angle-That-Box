app.controller('AdminCtrl', function($scope) {

	$scope.upload = function() {
      var data = null;
      var file = $("#csvfile")[0].files[0];
      var filereader = new FileReader();
      filereader.readAsText(file);
      filereader.onload = function(event) {
          var csvData = event.target.result;
          var objs = $.csv.toObjects(csvData);
          console.log(objs);
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