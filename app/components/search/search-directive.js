'use strict';

module.exports = exports = (app) => {
  app.component('searchComponent', {
    controller: 'SearchController',
    template: require('./search-template.html')
  });
};
