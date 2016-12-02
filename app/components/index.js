'use strict';

module.exports = exports = (app) =>{
  require('./home')(app);
  require('./results')(app);
};
