(function(){
  window.google = window.google || {
    maps: {
      Map: function(){},
      /*
      This is a work around I found to avoid having to deal with playing with the Google API
      If errors seen while running the Karma Server over not finding some funciton, 
      define them here, unless your unit tests desperately need to use it
      */

    }
  };
})();