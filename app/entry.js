'use strict';

// webpack assets
require('!!file?name=[name].[ext]!./html/index.html');
require('./scss/index.scss');

// npm modules
const angular = require('angular');
const angular_route = require('angular-route');

// angular modules
var topThreeApp = angular.module('topThreeApp', [angular_route]);

topThreeApp.config(['$routeProvider', function($route) {
  $route
    .when('/', {
      template: require('./html/home.html')
    })
    .when('/search/:term/:location', {
      template: require('./html/search.html')
    })
    .otherwise({
      redirectTo: '/'
    });
}]);

// angular components
require('./services')(topThreeApp);
require('./components')(topThreeApp);
