'use strict';

const baseUrl = `${__API_URL__}/api/yelp`;

module.exports = exports = (app) => {
  app.controller('HomeController', ['yelpService', '$location', '$http', HomeController]);
};

function HomeController(yelpService, $location, $http) {
  this.ask = function(params) {
    console.log('yelpService params: ', params);
    $http.post(baseUrl, params)
      .then((data) => {
        data = data.data.businesses.sort(function(a,b){
          return b.review_count - a.review_count;
        });
        yelpService.data = data.slice(0,3);
        let gold = yelpService.data.splice(0,1);
        yelpService.data.splice(1, 0, gold[0]); //put #1 in the middle
        yelpService.data.map(function(item){
          let newImage = item.image_url.slice(0, item.image_url.length - 6);
          newImage  += 'o.jpg';
          item.image_url = newImage;
        });
        console.log('this.data: ', yelpService.data);
        $location.path('/search');
      });
  };

  // this.ask = function(params) {
  //   console.log('clicked');
  //   console.log('HomeController params: ', params);
  //   return $q((resolve, reject) => {
  //     yelpService.retrieve(params);
  //
  //   }).then(() => {
  //     $location.path('/search');
  //   });
  // };
}
