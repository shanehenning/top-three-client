'use strict';

module.exports = exports = (app) => {
  app.service('dataService', ['$http', '$location', dataService]);
};

function dataService($http, $location) {
  let thisDataService = this;
  thisDataService.api = {};
  thisDataService.api.yelp = [];
  thisDataService.api.twitter = [];
  thisDataService.api.facebook = [];

  thisDataService.makeApiCalls = function(params) {
    $http.post(`${__API_URL__}/api/yelp`, params)
      .then((data) => {
        data = data.data.businesses.sort(function(a, b) {
          return b.review_count - a.review_count;
        });
        thisDataService.api.yelp = data.slice(0, 3);
        thisDataService.api.yelp[0].index = 0;
        thisDataService.api.yelp[1].index = 1;
        thisDataService.api.yelp[2].index = 2;
        thisDataService.api.yelp.map(function(item) {
          // thisDataService.api.twitter[item].index = 'blah';
          // console.log('item.index', thisDataService.api.twitter[item].index);
          let newImage = item.image_url.slice(0, item.image_url.length - 6);
          newImage += 'o.jpg';
          item.image_url = newImage;
          var twitterParams = {
            // q: item.location.coordinate.latitude + ',' + item.location.coordinate.longitude + ',1mi since:2014-01-01'
            q: item.name + ' ' + item.location.city + ' since:2014-01-01',
          };
          // console.log('twitterParams: ', twitterParams);
          $http.post(`${__API_URL__}/api/twitter`, twitterParams)
            .then(function(data){
              thisDataService.api.twitter[item.index] = data;
              // console.log('thisDataService.api.twitter[item]: ', thisDataService.api.twitter[item]);
            });
          var facebookParams = {
            q: item.name,
            location: item.location.city
          };
          $http.post(`${__API_URL__}/api/facebook`, facebookParams)
            .then(function(data){
              thisDataService.api.facebook[item.index] = data;
              // console.log('thisDataService.api.facebook[item]: ', thisDataService.api.facebook[item]);
            });
        });
        // yelpService.par = yelpService.data[0].review_count;
        // console.log('homeController thisDataService: ', thisDataService);
        $location.path('/search/' + params.term + '/' + params.location);
      });
  };



}
