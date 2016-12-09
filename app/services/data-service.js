'use strict';

const moment = require('moment');
// moment.format();

module.exports = exports = (app) => {
  app.service('dataService', ['$http', '$location', dataService]);
};

function dataService($http, $location) {
  this.api = [{}, {}, {}];

  this.makeApiCalls = function(params) {
    $http.post(`${API_URL}/api/yelp`, params)
      .then((data) => {
        data = data.data.businesses.sort(function(a, b) {
          return b.review_count - a.review_count;
        });

        this.api.map(function(idx) {
          idx.yelp = data.splice(idx, 1)[0];

          let newImage = idx.yelp.image_url.slice(0, idx.yelp.image_url.length - 6);
          newImage += 'o.jpg';
          idx.yelp.image_url = newImage;
          if(idx.yelp.name.length > 30){
            idx.yelp.name_truncated = idx.yelp.name.substr(0,30);
          }
          var twitterParams = {
            q: idx.yelp.name + ' ' + idx.yelp.location.city + ' since:2014-01-01',
          };
          $http.post(`${__API_URL__}/api/twitter`, twitterParams)
            .then(function(data) {
              idx.twitter = data.data.statuses.slice(0, 3);
              if (idx.twitter[0]) {
                idx.twitter.map(function(twitterDate) {
                  twitterDate.created_at = moment(twitterDate.created_at).fromNow();
                });
              }
            });

          var facebookParams = {
            q: idx.yelp.name,
            location: idx.yelp.location.city
          };
          $http.post(`${__API_URL__}/api/facebook`, facebookParams)
            .then(function(data) {
              idx.facebook = data.data.data[0];
              if (idx.facebook.posts) {
                idx.facebook.posts.data.map(function(facebookDate) {
                  facebookDate.created_time = moment(facebookDate.created_time).fromNow();
                });
              }
              if (idx.facebook.hours.mon_1_open) {
                let split;
                let suffix;
                for (var key in idx.facebook.hours) {
                  if (idx.facebook.hours.hasOwnProperty(key)) {
                    split = idx.facebook.hours[key].split(':');
                    suffix = parseInt(split[0]) >= 12 ? ' pm' : ' am';
                    idx.facebook.hours[key] = ((parseInt(split[0]) + 11) % 12 + 1).toString() + ':' + split[1] + suffix;
                    if (idx.facebook.hours[key] === '12:00 pm') {
                      idx.facebook.hours[key] = 'Noon';
                    }
                    if (idx.facebook.hours[key] === '12:00 am') {
                      idx.facebook.hours[key] = 'Midnight';
                    }
                  }
                }
              }
              if (idx.facebook.website) {
                idx.facebook.website_display = '';
                idx.facebook.website_display = idx.facebook.website;
                idx.facebook.website_display = idx.facebook.website_display.split('https://')[1] === undefined ? idx.facebook.website_display : idx.facebook.website_display.split('https://')[1];
                idx.facebook.website_display = idx.facebook.website_display.split('http://')[1] === undefined ? idx.facebook.website_display : idx.facebook.website_display.split('http://')[1];
                idx.facebook.website_display = idx.facebook.website_display.split('www.')[1] === undefined ? idx.facebook.website_display : idx.facebook.website_display.split('www.')[1];
                idx.facebook.website_display = idx.facebook.website_display.charAt(idx.facebook.website_display.length - 1) === '/' ? idx.facebook.website_display.substr(0, idx.facebook.website_display.length - 1) : idx.facebook.website_display;
              }

            });
        });

        console.log('dataService.api: ', this.api);
        $location.path('/search/' + params.term + '/' + params.location);
      });
  };
}
