'use strict';

module.exports = exports = (app) => {
  app.controller('ResultsController', ['yelpService', ResultsController]);
};

function ResultsController(yelpService){
  this.data = yelpService.data;
}
