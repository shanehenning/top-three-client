'use strict';

module.exports = exports = (app) => {
  app.controller('HomeController', ['dataService', '$location', '$http', HomeController]);
};

function HomeController(dataService, $location, $http) {
  // this.p = {
  //   term: 'sandwich',
  //   location: 'seattle'
  // };

  this.ask = function(params) {
    let yelpItem;
    $http.post(`${__API_URL__}/api/yelp`, params)
      .then((data) => {
        data = data.data.businesses.sort(function(a, b) {
          return b.review_count - a.review_count;
        });
        dataService.api.yelp = data.slice(0, 3);
        dataService.api.yelp[0].index = 0;
        dataService.api.yelp[1].index = 1;
        dataService.api.yelp[2].index = 2;
        console.log(dataService.api.yelp);
        dataService.api.yelp.map(function(item) {
          // dataService.api.twitter[item].index = 'blah';
          // console.log('item.index', dataService.api.twitter[item].index);
          let newImage = item.image_url.slice(0, item.image_url.length - 6);
          newImage += 'o.jpg';
          item.image_url = newImage;
          var twitterParams = {
            // q: item.location.coordinate.latitude + ',' + item.location.coordinate.longitude + ',1mi since:2014-01-01'
            q: item.name + ' ' + item.location.city + ' since:2014-01-01',
          };
          // console.log('twitterParams: ', twitterParams);
          $http.post(`${__API_URL__}/api/twitter`, twitterParams)
            .then((data) => {
              dataService.api.twitter[item.index] = data;
              // console.log('dataService.api.twitter[item]: ', dataService.api.twitter[item]);
            });
          var facebookParams = {
            q: item.name,
            location: item.location.city
          };
          $http.post(`${__API_URL__}/api/facebook`, facebookParams)
            .then((data) => {
              dataService.api.facebook[item.index] = data;
              // console.log('dataService.api.facebook[item]: ', dataService.api.facebook[item]);
            });
        });
        // yelpService.par = yelpService.data[0].review_count;
        // console.log('homeController dataService: ', dataService);
        $location.path('/results');
      });
  };
}
