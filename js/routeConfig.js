//configure the routes
app.config(function($routeProvider) {
   //each view is assigned a controller here
   $routeProvider
   .when("/",
         {
            templateUrl: "views/main.html",
            controller: "UserAccountCtrl"
         }
      )
   .when("/dashboard",
         {
            templateUrl: "views/dashboard.html",
            controller: "DashboardCtrl"
         }
   )
   .when("/createAccount",
         {
            templateUrl: "views/createAccount.html",
            controller: "UserAccountCtrl"
         }
   )
   .when("/wishlist",
         {
            templateUrl: "views/wishlist.html",
            controller: "WishlistController"
         }
   )
   .when("/createAccount",
         {
            templateUrl: "views/favourites.html",
            controller: "FavouriteController"
         }
   );
});