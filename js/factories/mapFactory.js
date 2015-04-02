app.factory('MapFactory', function() 
{
	var factory = {};
	var URLprefix = /http/;
	var markers = [];
	var infowindows = [];
	var openWindow;
	var selectedMarker;

	var directionService = new google.maps.DirectionsService();
	var directionsDisplay;
	factory.createMap = function() {
		var map = new google.maps.Map(document.getElementById('map-canvas'));
		directionsDisplay = new google.maps.DirectionsRenderer();

		google.maps.event.addListener(map, "click", function(event) {
		    closeOpenWindows();
		    openWindow = undefined;
		    selectedMarker = undefined;
		});

		directionsDisplay.setMap(map);
		return map;
	}

	factory.createRoute = function(locations){
		var start = 0;
		var finish = 0;
		var path=[];
		if (locations.length == 2){
			start = locations[0];
			finish = locations[locations.length - 1];

			var request = {
				origin: new google.maps.LatLng(start.LATITIUDE, start.LONGITUDE),
				destination: new google.maps.LatLng(finish.LATITIUDE, finish.LONGITUDE),
				travelMode: google.maps.TravelMode.DRIVING
			};
			
			directionService.route(request, function(response, status){
				if (status == google.maps.DirectionsStatus.OK) {
					directionsDisplay.setDirections(response);
				}
			});
		} else if (locations.length > 2){
			start = locations[0];
			finish = locations[locations.length - 1];

			for(var i = 1; i < locations.length-1; i++){ //add all the middle elements
				path.push(
					{
    					location: new google.maps.LatLng(locations[i].LATITIUDE, locations[i].LONGITUDE),
     					stopover:true
   					}
				);
			}

			var request = {
				origin: new google.maps.LatLng(start.LATITIUDE, start.LONGITUDE),
				destination: new google.maps.LatLng(finish.LATITIUDE, finish.LONGITUDE),
				waypoints: path,
				travelMode: google.maps.TravelMode.DRIVING
			};

			directionService.route(request, function(response, status){
				if (status == google.maps.DirectionsStatus.OK) {
					directionsDisplay.setDirections(response);
				}
			});
		}
	}


    factory.populateMap = function(amap, locationsList) {
		openWindow = undefined;
		selectedMarker = undefined;
        infowindows = [];
        var index = 0;
        var len = locationsList.length-1;
		var bounds = new google.maps.LatLngBounds(); 
		while(index <= locationsList.length-1) {
			var obj = locationsList[index];
			bounds.extend(new google.maps.LatLng(obj.LATITIUDE, obj.LONGITUDE));
			markers.push(createMarker(obj, amap, index));
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
			selectedMarker = marker;
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
		selectedMarker = markers[index];
	}

	factory.clearMarkers = function() {
		var i = 0;
	      while(i < markers.length) {
	         markers[i].setMap(null);
	         i++;
	      }
	      markers = [];
	}

	factory.getSelectedMarker = function() {
		return selectedMarker;
	}

	return factory;

})