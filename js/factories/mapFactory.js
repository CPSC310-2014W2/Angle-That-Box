app.factory('MapFactory', function($http) 
{
	var factory = {};

	factory.createMap = function() {
		return new google.maps.Map(document.getElementById('map-canvas'));
	}

	factory.getMapData = function(amap, markers) { //this just uses the sample json file for now instead of querying firebase
		$http.get('sampleData.json').success(function(data) {
			var bounds = new google.maps.LatLngBounds(); 
		    for (var key in data.locations) {
		    	var loc = data.locations[key];
		    	bounds.extend(new google.maps.LatLng(loc.LATITIUDE, loc.LONGITUDE));
			    markers.push(createMarker(loc, amap));
		   }
		   amap.fitBounds(bounds);
	   })
	}

	function createMarker(obj, amap) {
		var marker = new google.maps.Marker({
		    position: new google.maps.LatLng(obj.LATITIUDE, obj.LONGITUDE),
		    map: amap,
		});

		var infowindow = new google.maps.InfoWindow({ 
	    });

		google.maps.event.addListener(marker, 'click', function() {
			infowindow.setContent('<h1>' + obj.CULTURAL_SPACE_NAME + '<h1>');
			infowindow.open(amap, marker);
		});

		return marker;
	}

	return factory;

})