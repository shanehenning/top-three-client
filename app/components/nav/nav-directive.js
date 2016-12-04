'use strict';

module.exports = exports = (app)=>{
  app.component('navComponent', {
    controller: 'SearchController',
    template: require('./nav-template.html'),
    bindings: {
      display: '='
    }
  });
};
