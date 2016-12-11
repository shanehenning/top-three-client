'use strict';

module.exports = exports = (app) => {
  app.controller('HomeController', ['dataService', '$location', '$log', HomeController]);
};

function HomeController(dataService, $location, $log) {
  this.goSearch = function(params) {
    $log.debug('HomeController goSearch');
    dataService.makeApiCalls(params);
    document.getElementById('wait').style.cursor = 'wait';
  };
}
