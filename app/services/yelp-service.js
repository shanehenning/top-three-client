'use strict';

// const baseUrl = `${__API_URL__}/api/yelp`;

module.exports = exports = (app) => {
  app.service('yelpService', ['$http', yelpService]);
};

function yelpService($http) {
  this.data = {};
  // this.retrieve = function(params) {
  //   console.log('yelpService params: ', params);
  //   $http.post(baseUrl, params)
  //     .then((data) => {
  //       data = data.data.businesses.sort(function(a,b){
  //         return b.review_count - a.review_count;
  //       });
  //       this.data = data.slice(0,3);
  //       console.log('this.data: ', this.data);
  //     });
  // };
}
