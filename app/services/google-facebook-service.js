'use strict';

module.exports = exports = (app) => {
  app.service('googleFacebookService', ['$scope', googleFacebookService]);
};

function googleFacebookService($scope){
  $scope.startFacebook = function(d, s, id){
    return $q(function(resolve,reject){
      this.initFacebook(d,s,id);
      resolve('Facebook initialized');
    }).then(()=>{
      this.fbAsyncInit();
    });
  };

  $scope.initFacebook = function(d,s,id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = '//connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk');

  $scope.fbAsyncInit = function(){
    FB.init({
      appId      : `${__FACEBOOK_APP_ID__}`,
      xfbml      : true,
      version    : 'v2.8'
    });
  };

  $scope.appendGoogleMaps = function(){
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?key=' + __GOOGLE_MAPS_KEY__;
    document.body.appendChild(script);
  };
}