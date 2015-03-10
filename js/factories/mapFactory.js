app.factory('MapFactory', function($http, $compile) 
{
	var factory = {};
	var reg = /http/;
	var openwindows = [];

	factory.createMap = function() {
		var map = new google.maps.Map(document.getElementById('map-canvas'));

		google.maps.event.addListener(map, "click", function(event) {
		    closeOpenWindows();
		});

		return map;
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
			openwindows.push(infowindow);
		});

		return marker;
	}

	function getContentString(obj) {
		var prefix = "";
		var webURL = obj.WEBSITE;

		if (!reg.test(webURL)) {
			prefix = "http://"
		}

		return '<h3>' + obj.CULTURAL_SPACE_NAME + '</h3>'
		+ '<p>' + obj.ADDRESS + '</p>'
		+ '<p>' + obj.TYPE + '</p>'
		+ '<a href=' + prefix + webURL + ' target="_blank">' + webURL + '</a>'
	}

	function closeOpenWindows() {
		for (var i = 0; i < openwindows.length; i++ ) {
	        openwindows[i].close();
		}
		openwindows = [];
	}

	return factory;

})