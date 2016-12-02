'use strict';

module.exports = exports = (app) => {
  app.component('results', {
    controller: 'ResultsController',
    template: require('./results-template.html')
  });
};
