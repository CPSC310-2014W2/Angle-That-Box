app.factory('MapFactory', function($http) 
{
	var factory = {};
	var default_long = 49.3; //needs to change in the future
	var default_lat = -123;
	var default_zoom = 9;

	factory.createMap = function() {
	   var mapOptions = {
		    zoom: default_zoom,
		    center: new google.maps.LatLng(default_long, default_lat) //needs to change based on markers
		}
		return new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	}

	factory.getMapData = function(amap, markers) { //this just uses the sample json file for now instead of querying firebase
		$http.get('sampleData.json').success(function(data) { 
		    for (var key in data.locations) {
		    	var loc = data.locations[key];
			    createMarker(loc, amap, markers);
		   }
	   })
	}

	function createMarker(obj, amap, markers) {
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

		markers.push(marker);
	}

	return factory;

})