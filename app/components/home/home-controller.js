'use strict';

module.exports = exports = (app) => {
  app.controller('HomeController', ['dataService', HomeController]);
};

function HomeController(dataService) {
  this.retrieveData = function(params){
    dataService.makeApiCalls(params);
    console.log('HomeController dataService: ', dataService);
  };
}
