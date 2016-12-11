'use strict';

module.exports = exports = (app) => {
  app.controller('HomeController', ['dataService', '$location', '$log', HomeController]);
};

function HomeController(dataService, $location, $log) {
  this.goSearch = function(params) {
    $log.debug('HomeController goSearch');
    dataService.makeApiCalls(params);
    document.getElementById('wait').style.cursor = 'wait';
  };

  // this.strengthBack = 50;
  // this.strengthMiddle = 100;
  // this.strengthFore = 200;
  //
  // this.background = document.getElementById('background');
  // this.middleground = document.getElementById('middleground');
  // this.foreground = document.getElementById('foreground');
  //
  // this.parallax = function(e){
  //   this.xCoordinates = e.clientX - (window.innerWidth / 2);
  //   this.yCoordinates = e.clientY - (window.innerHeight / 2);
  //
  //   this.background.style.backgroundPosition = (this.strengthBack / window.innerWidth * this.xCoordinates * -1) + 'px ' + (this.strengthBack / window.innerHeight * this.yCoordinates * -1) + 'px';
  //   this.middleground.style.backgroundPosition = (this.strengthMiddle / window.innerWidth * this.xCoordinates * -1) + 'px ' + (this.strengthMiddle / window.innerHeight * this.yCoordinates * -1) + 'px';
  //   this.foreground.style.backgroundPosition = (this.strengthFore / window.innerWidth * this.xCoordinates * -1) + 'px ' + (this.strengthFore / window.innerHeight * this.yCoordinates * -1) + 'px';
  //
  // };
}
