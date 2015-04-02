'use strict',


describe('RoutesFactory', function(){

	beforeEach(angular.mock.module('app'));
  var locations = [{
    "ACTIVE_SPACE" : "Yes",
    "ADDRESS" : "2837 Cambie St, Vancouver, BC, V5Z 3Y8",
    "CULTURAL_SPACE_NAME" : "Yuk Yuk's Comedy Club",
    "LATITIUDE" : "49.2600654",
    "LOCAL_AREA" : "Fairview",
    "LONGITUDE" : "-123.1151069",
    "NUMBER_OF_SEATS" : "150",
    "OWNERSHIP" : "Privately Owned",
    "PRIMARY_USE" : "Performance Space",
    "SQUARE_FEET" : "",
    "TYPE" : "Theatre/Performance",
    "WEBSITE" : "http://www.yukyuks.com"
  },  {
    "ACTIVE_SPACE" : "Yes",
    "ADDRESS" : "1310 William St, Vancouver, BC, V5L 2P5",
    "CULTURAL_SPACE_NAME" : "William Clark Studios",
    "LATITIUDE" : "49.2740112",
    "LOCAL_AREA" : "Grandview-Woodland",
    "LONGITUDE" : "-123.0771637",
    "NUMBER_OF_SEATS" : "",
    "OWNERSHIP" : "Privately Owned",
    "PRIMARY_USE" : "Artist Studio",
    "SQUARE_FEET" : "",
    "TYPE" : "Studio/Rehearsal ",
    "WEBSITE" : ""
  }, {
    "ACTIVE_SPACE" : "Yes",
    "ADDRESS" : "258 E 1st Ave, Vancouver, BC, V5T 1A6",
    "CULTURAL_SPACE_NAME" : "Winsor Gallery",
    "LATITIUDE" : "49.2689553",
    "LOCAL_AREA" : "Strathcona",
    "LONGITUDE" : "-123.0984496",
    "NUMBER_OF_SEATS" : "",
    "OWNERSHIP" : "Privately Owned",
    "PRIMARY_USE" : "Museum/Gallery",
    "SQUARE_FEET" : "6000",
    "TYPE" : "Museum/Gallery",
    "WEBSITE" : "www.winsorgallery.com"
  }, {
    "ACTIVE_SPACE" : "Yes",
    "ADDRESS" : "1882 Adanac St, Vancouver, BC, V5L 2E2",
    "CULTURAL_SPACE_NAME" : "Wise Club Hall",
    "LATITIUDE" : "49.2772414",
    "LOCAL_AREA" : "Grandview-Woodland",
    "LONGITUDE" : "-123.0660915",
    "NUMBER_OF_SEATS" : "225",
    "OWNERSHIP" : "Non-Profit",
    "PRIMARY_USE" : "Performance Space",
    "SQUARE_FEET" : "2600",
    "TYPE" : "Theatre/Performance",
    "WEBSITE" : "www.wisehall.ca"
  }, {
    "ACTIVE_SPACE" : "Yes",
    "ADDRESS" : "111 W Hastings St, Vancouver, BC, V6B 1H4",
    "CULTURAL_SPACE_NAME" : "Woodward's Atrium",
    "LATITIUDE" : "49.282541",
    "LOCAL_AREA" : "Downtown",
    "LONGITUDE" : "-123.107579",
    "NUMBER_OF_SEATS" : "",
    "OWNERSHIP" : "",
    "PRIMARY_USE" : "Performance Space",
    "SQUARE_FEET" : "",
    "TYPE" : "Theatre/Performance",
    "WEBSITE" : ""
  }, {
    "ACTIVE_SPACE" : "Yes",
    "ADDRESS" : "881 E Hastings St, Vancouver, BC, V6A 1R8",
    "CULTURAL_SPACE_NAME" : "Writers' Exchange",
    "LATITIUDE" : "49.2811097",
    "LOCAL_AREA" : "Strathcona",
    "LONGITUDE" : "-123.0853822",
    "NUMBER_OF_SEATS" : "",
    "OWNERSHIP" : "Privately Owned",
    "PRIMARY_USE" : "Workshop",
    "SQUARE_FEET" : "",
    "TYPE" : "Studio/Rehearsal ",
    "WEBSITE" : ""
  }, {
    "ACTIVE_SPACE" : "Yes",
    "ADDRESS" : "639 Commercial Dr, Vancouver, BC, V5L 2W2",
    "CULTURAL_SPACE_NAME" : "York Theatre",
    "LATITIUDE" : "49.2786795",
    "LOCAL_AREA" : "Grandview-Woodland",
    "LONGITUDE" : "-123.0707458",
    "NUMBER_OF_SEATS" : "370",
    "OWNERSHIP" : "City of Vancouver",
    "PRIMARY_USE" : "Theatre",
    "SQUARE_FEET" : "15000",
    "TYPE" : "Theatre/Performance",
    "WEBSITE" : "https://thecultch.com/locations/york-theatre/"
  }]



	it('getSelectable should get an empty list of Select values', angular.mock.inject(function($injector) {
    var factory = $injector.get('RoutesFactory');

    var route = []
    var result =  factory.getSelectable(route);

    //empty return
    expect(result.length).toBe(0);
  }));

  it('getSelectable should get a select list of size 4', angular.mock.inject(function($injector) {
    //Size is the same size
    var factory = $injector.get('RoutesFactory');

    var route = [{name: 'hello', id: 'myName'}, 
    {name: 'hello', id: 'myName'},
    {name: 'hello', id: 'myName'},
    {name: 'hello', id: 'myName'}]
    var result = factory.getSelectable(route);

  	expect(result.length).toBe(route.length);
    for (var i = 0; i  <result.length; i++)
    {
      expect(result[i].value).toBe(i)
      expect(result[i].name).toBe(i + 1);
    }
  }));

  it('getSelectable should get a select list of size 100', angular.mock.inject(function($injector) {
    var factory = $injector.get('RoutesFactory');
    route = []
    var arrayLength = 100;
    //Note, that teh actual array given should not affect the result returned
    for (var i = 0; i < arrayLength; i++){
      route.push(i);
    }

    var result = factory.getSelectable(route);

    expect(result.length).toBe(arrayLength);
    for (var i = 0; i  < arrayLength; i++){
      expect(result[i].value).toBe(i)
      expect(result[i].name).toBe(i + 1);
    }
  }));

  it('getTheRoute should return an empty route',angular.mock.inject(function($injector){
    var factory = $injector.get('RoutesFactory');

    var routes = [];

    //empty case
    var result = factory.getTheRoute(locations,routes)
    expect(result.length).toBe(0);
  }));

  it('getTheRoute should return an unsorted list of routes',angular.mock.inject(function($injector){
    var factory = $injector.get('RoutesFactory');

    //Try a small Route
    var routes = [];
    var routeLength = 3;
    for (var i = 0; i < routeLength; i++){
      var element = {name: locations[i].CULTURAL_SPACE_NAME, $priority: null}
      routes.push(element);
    }

    result = factory.getTheRoute(locations, routes);

    expect(result.length).toBe(routeLength);

    for(var i = 0; i < routeLength;i++){ 
      expect(result[i].CULTURAL_SPACE_NAME).toBe(locations[i].CULTURAL_SPACE_NAME);
    }

  }))

  it('getTheRoute should return a route of all the locations',angular.mock.inject(function($injector){
    var factory = $injector.get('RoutesFactory');
    //Create Route with all the locations available
    var routes = [];
    var routeLength = locations.length;

    for (var i = 0; i < routeLength; i++){
      var element = {name: locations[i].CULTURAL_SPACE_NAME, $priority: null}
      routes.push(element);
    }

    result = factory.getTheRoute(locations, routes);

    expect(result.length).toBe(routeLength);

    for(var i = 0; i < routeLength;i++){ 
      expect(result[i].CULTURAL_SPACE_NAME).toBe(locations[i].CULTURAL_SPACE_NAME);
    }
  }));

  it('sortRouteByPriority should return the list in the opposite order', angular.mock.inject(function($injector){
    factory = $injector.get('RoutesFactory');
    
    routes = [
      {name: 'Larrys Burgers' ,$priority: 4},
      {name: 'Alfreds Fries Shack' ,$priority: 3},
      {name: 'Maggys Muggery',$priority: 2},
      {name: 'Joeys Place of Tears',$priority: 1}
    ];


    var result = factory.sortRouteByPriority(routes);

    expect(result[0].name).toContain('Joeys');
    expect(result[1].name).toContain('Maggys');
    expect(result[2].name).toContain('Alfreds');
    expect(result[3].name).toContain('Larrys');
  }))

  it('sortRouteByPriority should return the list in original order with priority null', angular.mock.inject(function($injector){
    factory = $injector.get('RoutesFactory');
    
    routes = [
      {name: 'Larrys Burgers' ,$priority: null},
      {name: 'Alfreds Fries Shack' ,$priority: null},
      {name: 'Maggys Muggery',$priority: null},
      {name: 'Joeys Place of Tears',$priority: null}
    ];


    var result = factory.sortRouteByPriority(routes);

    expect(result[0].name).toContain('Larrys');
    expect(result[1].name).toContain('Alfreds');
    expect(result[2].name).toContain('Maggys');
    expect(result[3].name).toContain('Joeys');
  }))

  it('sortRouteByPriority should return the list in original order with all equal priorities', angular.mock.inject(function($injector){
    factory = $injector.get('RoutesFactory');
    
    routes = [
      {name: 'Larrys Burgers' ,$priority: 3},
      {name: 'Alfreds Fries Shack' ,$priority: 3},
      {name: 'Maggys Muggery',$priority: 3},
      {name: 'Joeys Place of Tears',$priority: 3}
    ];


    var result = factory.sortRouteByPriority(routes);

    expect(result[0].name).toContain('Larrys');
    expect(result[1].name).toContain('Alfreds');
    expect(result[2].name).toContain('Maggys');
    expect(result[3].name).toContain('Joeys');
  }))


  it('sortRouteByPriority should return the list in original order with all equal priorities', angular.mock.inject(function($injector){
    var factory = $injector.get('RoutesFactory');
    
    var routes = [
      {name: 'Larrys Burgers' ,$priority: 3},
      {name: 'Alfreds Fries Shack' ,$priority: 3},
      {name: 'Maggys Muggery',$priority: 3},
      {name: 'Joeys Place of Tears',$priority: 3}
    ];


    var result = factory.sortRouteByPriority(routes);

    expect(result[0].name).toContain('Larrys');
    expect(result[1].name).toContain('Alfreds');
    expect(result[2].name).toContain('Maggys');
    expect(result[3].name).toContain('Joeys');
  }))

  it('sortRouteByPriority should return list sorted with random priorities', angular.mock.inject(function($injector){
    var factory = $injector.get('RoutesFactory');
    
    var routes = [
      {name: 'Larrys Burgers' ,$priority: 50},
      {name: 'Alfreds Fries Shack' ,$priority: 1},
      {name: 'Maggys Muggery',$priority: 3},
      {name: 'Joeys Place of Tears',$priority: 25}
    ];


    var result = factory.sortRouteByPriority(routes);

    expect(result[0].name).toContain('Alfreds');
    expect(result[1].name).toContain('Maggys');
    expect(result[2].name).toContain('Joeys');
    expect(result[3].name).toContain('Larrys');
  }))

  it('sortRoute should return list of places in order route is prioritized', angular.mock.inject(function($injector){
    var factory = $injector.get('RoutesFactory');
    var routes = [
      {name: "Writers' Exchange" ,$priority: 50},
      {name: "York Theatre" ,$priority: 1},
      {name: "Winsor Gallery",$priority: 3},
      {name: "William Clark Studios",$priority: 25}
    ];

    var sortedRoutes = [
      {name: "York Theatre" ,$priority: 1},
      {name: "Winsor Gallery",$priority: 3},
      {name: "William Clark Studios",$priority: 25},      
      {name: "Writers' Exchange" ,$priority: 50}
    ]

    var result = factory.sortRoute(locations,routes);

    expect(result.length).toBe(sortedRoutes.length);
    for (var i = 0; i < result.length; i++){
      expect(result[i].CULTURAL_SPACE_NAME).toBe(sortedRoutes[i].name)
    }

  }))



});