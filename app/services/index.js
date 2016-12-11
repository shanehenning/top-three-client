'use strict';

module.exports = exports = (app) => {
  require('./facebook-service')(app);
  require('./data-service')(app);
};
