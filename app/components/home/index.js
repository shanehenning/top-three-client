'use strict';

module.exports = exports = (app) => {
  require('./home-directive')(app);
  require('./home-controller')(app);
};
