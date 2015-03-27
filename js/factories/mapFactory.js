app.factory('MapFactory', function($http, $compile) 
{
	var factory = {};
	var URLprefix = /http/;
	var markers = [];
	var infowindows = [];
	var openWindow;

	factory.createMap = function() {
		var map = new google.maps.Map(document.getElementById('map-canvas'));

		google.maps.event.addListener(map, "click", function(event) {
		    closeOpenWindows();
		});

		return map;
	}

	factory.populateMap = function(amap, locationsList) {
		infowindows = [];
		var index = 0;
		var len = locationsList.length-1;
		var bounds = new google.maps.LatLngBounds(); 
		while(index <= locationsList.length-1) {
			var obj = locationsList[index];
			bounds.extend(new google.maps.LatLng(obj.LATITIUDE, obj.LONGITUDE));
			markers.push(createMarker(obj, amap, len));
			index++;
		}
		amap.fitBounds(bounds);
	}

	function createMarker(obj, amap, ind) {
		var marker = new google.maps.Marker({
		    position: new google.maps.LatLng(obj.LATITIUDE, obj.LONGITUDE),
		    map: amap,
		    index: ind //storing the index for future reference
		});

		var infowindow = new google.maps.InfoWindow({});
		infowindow.setContent(getURL(obj));
		infowindows.push(infowindow);

		google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(amap, marker);
			closeOpenWindows();
			openWindow = infowindow;
		});

		return marker;
	}

	//get website url given a location object
	function getURL(obj) {
		var prefix = "";
		var webURL = obj.WEBSITE;

		if (!URLprefix.test(webURL)) {
			prefix = "http://"
		}

		return '<h3>' + obj.CULTURAL_SPACE_NAME + '</h3>'
		+ '<p>' + obj.ADDRESS + '</p>'
		+ '<p>' + obj.TYPE + '</p>'
		+ '<a href=' + prefix + webURL + ' target="_blank">' + webURL + '</a>'
	}

	function closeOpenWindows() {
		if(openWindow != undefined) {
		    	openWindow.close();
		}
	}

	factory.openWindow = function(index, amap) {
		infowindows[index].open(amap, markers[index]);
		closeOpenWindows();
		openWindow = infowindows[index];
	}

	factory.clearMarkers = function() {
		var i = 0;
	      while(i < markers.length) {
	         markers[i].setMap(null);
	         i++;
	      }
	      markers = [];
	}

	return factory;

})