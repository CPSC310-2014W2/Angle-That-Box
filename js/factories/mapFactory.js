app.factory('MapFactory', function($http, $compile) 
{
	var factory = {};
	var reg = /http/;

	factory.createMap = function() {
		return new google.maps.Map(document.getElementById('map-canvas'));
	}

	factory.getMapData = function(amap, inputlist, markers) {
		var len = inputlist.length-1;
		var bounds = new google.maps.LatLngBounds(); 
		while(len >= 0) {
			var obj = inputlist[len];
			bounds.extend(new google.maps.LatLng(obj.LATITIUDE, obj.LONGITUDE));
			markers.push(createMarker(obj, amap, len));
			len--;
		}
		amap.fitBounds(bounds);
	}

	function createMarker(obj, amap, ind) {
		var marker = new google.maps.Marker({
		    position: new google.maps.LatLng(obj.LATITIUDE, obj.LONGITUDE),
		    map: amap,
		    index: ind //storing the index for future reference
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