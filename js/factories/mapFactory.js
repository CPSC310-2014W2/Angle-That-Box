app.factory('MapFactory', function($http, $compile) 
{
	var factory = {};
	var reg = /http/;

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
			infowindow.setContent(getContentString(obj));
			infowindow.open(amap, marker);
		});

		return marker;
	}

	function getContentString(obj) {
		var s = "";
		var web = obj.WEBSITE;

		if (!reg.test(web)) {
			s = "http://"
		}

		return '<h3>' + obj.CULTURAL_SPACE_NAME + '</h3>'
		+ '<p>' + obj.ADDRESS + '</p>'
		+ '<p>' + obj.TYPE + '</p>'
		+ '<a href=' + s + web + '>' + web + '</a>'
	}

	return factory;

})