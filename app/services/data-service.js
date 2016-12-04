'use strict';

module.exports = exports = (app) => {
  app.service('dataService', ['$http', '$location', dataService]);
};

function dataService($http, $location) {
  this.api =  [{}, {}, {}];

  this.makeApiCalls = function(params) {
    $http.post(`${__API_URL__}/api/yelp`, params)
      .then((data) => {
        data = data.data.businesses.sort(function(a, b) {
          return b.review_count - a.review_count;
        });

        this.api.map(function(idx){
          idx.yelp = data.splice(idx, 1)[0];

          let newImage = idx.yelp.image_url.slice(0, idx.yelp.image_url.length - 6);
          newImage += 'o.jpg';
          idx.yelp.image_url = newImage;

          var twitterParams = {
            q: idx.yelp.name + ' ' + idx.yelp.location.city + ' since:2014-01-01',
          };
          $http.post(`${__API_URL__}/api/twitter`, twitterParams)
            .then(function(data){
              idx.twitter = data.data.statuses.slice(0, 3);
            });

          var facebookParams = {
            q: idx.yelp.name,
            location: idx.yelp.location.city
          };
          $http.post(`${__API_URL__}/api/facebook`, facebookParams)
            .then(function(data){
              idx.facebook = data.data.data[0];
            });
        });

        console.log('dataService.api: ', this.api);
        $location.path('/search/' + params.term + '/' + params.location);
      });
  };
}
