'use strict';

module.exports = exports = (app) => {
  app.service('dataService', [dataService]);
};

function dataService() {
  this.api = {};
  this.api.yelp = [];
  this.api.twitter = [];
  this.api.facebook = [];
}
