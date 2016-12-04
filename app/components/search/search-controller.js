'use strict';

module.exports = exports = (app) => {
  app.controller('SearchController', ['dataService', '$location', SearchController]);
};

function SearchController(dataService, $location) {
  this.api = dataService.api;
  this.address = [];
  this.map = [];
  this.marker = [];
  this.infoWindow = [];
  this.articles = document.getElementsByTagName('article');

  this.retrieveData = function(){
    // if(dataService.api.yelp[0] !== undefined) return;
    let params = {
      term: $location.path().split('/').splice(2,1),
      location: $location.path().split('/').splice(3,1)
    };
    console.log('SearchController retrieveData');
    dataService.makeApiCalls(params);
  };

  this.getCorner = function(idx) {
    if (idx === 0) return 'url(../../../app/resources/gold-badge.svg)';
    if (idx === 1) return 'url(../../../app/resources/silver-badge.svg)';
    if (idx === 2) return 'url(../../../app/resources/bronze-badge.svg)';
  };
  this.getHorizontal = function(idx) {
    if (idx === 0) return 'url(../../../app/resources/gold-badge-horizontal.svg)';
    if (idx === 1) return 'url(../../../app/resources/silver-badge-horizontal.svg)';
    if (idx === 2) return 'url(../../../app/resources/bronze-badge-horizontal.svg)';
  };

  this.revolveRight = function(idx) {
    this.articles[idx].className += ' revolved ';
    if (this.articles[idx].classList.contains('returned')) {
      this.articles[idx].className -= ' ' + 'returned' + ' ';
    }
  };

  this.revolveLeft = function(idx) {
    this.articles[idx].className += ' returned ';
    if (this.articles[idx].classList.contains('revolved')) {
      this.articles[idx].className -= ' ' + 'revolved' + ' ';
    }
  };

  this.initMaps = function(idx, item){
    this.address[idx] = item.location.address[0] + ' ' + item.location.city + ' ' + item.location.postal_code;
    this.map[idx] = new google.maps.Map(document.getElementById('map-' + idx), {
      center: {
        lat: item.location.coordinate.latitude,
        lng: item.location.coordinate.longitude
      },
      zoom: 14
    });
    this.marker[idx] = new google.maps.Marker({
      position: {
        lat: item.location.coordinate.latitude,
        lng: item.location.coordinate.longitude
      },
      map: this.map[idx],
    });

    // this.infoWindow[idx] = new google.maps.InfoWindow({
    //   content: '<a href="http://maps.google.com/?q=' + this.address[idx] + '">' + item.name + '</a>'
    // });
    // console.log('this.infoWindow: ', this.infoWindow);
    // this.marker[idx].addListener('click', function(){
    //   this.infoWindow[idx].open(this.map[idx], this.marker[idx]);
    // });
  };
}
