'use strict';

module.exports = exports = (app) => {
  require('./results-directive')(app);
  require('./results-controller')(app);
};
