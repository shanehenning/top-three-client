'use strict';

module.exports = exports = (app) => {
  app.controller('SearchController', ['yelpService', SearchController]);
};

function SearchController(yelpService){
  this.data = yelpService.data;
}
