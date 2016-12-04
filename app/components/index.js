'use strict';

module.exports = exports = (app) =>{
  require('./home')(app);
  require('./search')(app);
  require('./nav')(app);
};
