'use strict';

module.exports = exports = (app) => {
  require('./google-facebook-service')(app);
  require('./data-service')(app);
};
