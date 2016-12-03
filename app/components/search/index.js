'use strict';

module.exports = exports = (app) => {
  require('./search-directive')(app);
  require('./search-controller')(app);
};
