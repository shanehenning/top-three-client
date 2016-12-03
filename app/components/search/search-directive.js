'use strict';

module.exports = exports = (app) => {
  app.component('search', {
    controller: 'SearchController',
    template: require('./search-template.html')
  });
};
