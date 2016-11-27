'use strict';

const angular = require('angular');
const topThreeApp = angular.module('topThreeApp');

topThreeApp.controller('HomeController', [function() {
  this.messages = ['hello', 'hello', 'hello'];
}]);
