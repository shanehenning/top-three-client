'use strict';

module.exports = exports = (app) => {
  app.controller('HomeController', ['dataService', '$location', HomeController]);
};

function HomeController(dataService, $location) {
  this.goSearch = function(params) {
    console.log('HomeController goSearch');
    dataService.makeApiCalls(params);
  };
}
