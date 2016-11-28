'use strict';

module.exports = exports = (app)=>{
  app.component('home', {
    controller: 'HomeController',
    template: require('./home-template.html')
  });
};
