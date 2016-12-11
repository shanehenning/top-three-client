'use strict';

module.exports = exports = (app) => {
  app.service('facebookService', ['$scope', '$q', facebookService]);
};

function facebookService($scope, $q){
  $scope.startFacebook = function(d, s, id){
    return $q(function(resolve,reject){
      $scope.initFacebook(d,s,id);
      resolve('Facebook initialized');
    }).then(()=>{
      $scope.fbAsyncInit();
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
}
