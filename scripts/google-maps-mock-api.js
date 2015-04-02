(function(){
  window.google = window.google || {
    maps: {
      Map: function() { },
      event: {
            addListener: function(var1,var2,var3){}
        },

      DirectionsService: function() { },
      DirectionsRenderer: function() { return {setMap: function (map) { }}}
      /*
      This is a work around I found to avoid having to deal with playing with the Google API
      If errors seen while running the Karma Server over not finding some funciton, 
      define them here, unless your unit tests desperately need to use it
      */

    },
    id : 000001
  };
})();