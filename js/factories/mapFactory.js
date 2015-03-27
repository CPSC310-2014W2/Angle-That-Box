app.factory('MapFactory', function($http, $compile) 
{
	var factory = {};
	var reg = /http/;
	var infowindows = [];
	var openWindow;

	factory.createMap = function() {
		// var mapOptions = {
		//     maxZoom: 16,
		// };
		var map = new google.maps.Map(document.getElementById('map-canvas'));

		google.maps.event.addListener(map, "click", function(event) {
		    closeOpenWindows();
		});

		return map;
	}

	factory.getMapData = function(amap, inputlist, markers) {
		infowindows = [];
		var index = 0;
		var len = inputlist.length-1;
		var bounds = new google.maps.LatLngBounds(); 
		while(index <= inputlist.length-1) {
			var obj = inputlist[index];
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
		infowindow.setContent(getContentString(obj));
		infowindows.push(infowindow);

		google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(amap, marker);
			closeOpenWindows();
			openWindow = infowindow;
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
		if(openWindow != undefined) {
		    	openWindow.close();
		}
	}

	factory.openWindow = function(index, amap, markers) {
		infowindows[index].open(amap, markers[index]);
		closeOpenWindows();
		openWindow = infowindows[index];
	}

	factory.clearMarkers = function(markers) {
		var i = 0;
	      while(i < markers.length) {
	         markers[i].setMap(null);
	         i++;
	      }
	      markers = [];
	}

	return factory;

})