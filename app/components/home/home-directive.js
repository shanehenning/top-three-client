'use strict';

module.exports = exports = (app)=>{
  app.component('homeComponent', {
    controller: 'HomeController',
    template: require('./home-template.html')
  });
};
