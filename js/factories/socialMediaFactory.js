app.factory('SocialMediaFactory', function(ProjectUrl)
{
   var factory = {};

   factory.tweet = function(loc) {
      var url = "https://twitter.com/share?url=google.com&text=" + "Check out this cultural space, " + loc.CULTURAL_SPACE_NAME + 
      " " + " that I found from " + ProjectUrl;
      window.open(url);
   }

   //The facebook project link is currently using localhost, need to change this once deployed

   factory.fbPost = function(loc) {
      var website = loc.WEBSITE;
         if (website == "") {
            website = ProjectUrl; //to be replaced with firebase url
         }
      var desc = 'Check out this cultural space I found from Outinglicious ' + ProjectUrl;
      FB.ui(
            {
               method: 'feed',
               name: loc.CULTURAL_SPACE_NAME,
               link: website,
               caption: loc.CULTURAL_SPACE_NAME,
               description: desc,
            },
               function(response) {
                  if (response && response.post_id) {
                     alert('Post was published.');
                  } else {
                     alert('Post was not published.');
               }
            }
         );
   }

   return factory; 
})