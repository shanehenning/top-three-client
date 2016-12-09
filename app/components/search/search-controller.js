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
  this.panelSocial = document.getElementsByClassName('panel-social');
  this.panelBusiness = document.getElementsByClassName('panel-business');
  this.panelDetails = document.getElementsByClassName('panel-details');
  this.socialWindows = document.getElementsByClassName('social-window');
  this.detailsWindows = document.getElementsByClassName('details-window');

  this.retrieveData = function(){
    if(dataService.api[0].yelp !== undefined) return;
    let params = {
      term: $location.path().split('/').splice(2,1),
      location: $location.path().split('/').splice(3,1)
    };
    console.log('SearchController retrieveData');
    dataService.makeApiCalls(params);
  };

  this.reSearch = function(params){
    dataService.makeApiCalls(params);
    console.log('HomeController dataService: ', dataService);
    document.getElementById('drawer').checked = false;
    document.getElementById('wait').style.cursor = 'wait';
  };

  this.getCorner = function(idx) {
    if (idx === 0) return 'url(resources/gold-badge.svg)';
    if (idx === 1) return 'url(resources/silver-badge.svg)';
    if (idx === 2) return 'url(resources/bronze-badge.svg)';
  };
  this.getHorizontal = function(idx) {
    if (idx === 0) return 'url(resources/gold-badge-horizontal.svg)';
    if (idx === 1) return 'url(resources/silver-badge-horizontal.svg)';
    if (idx === 2) return 'url(app/resources/bronze-badge-horizontal.svg)';
  };

  this.businessToDetails = function(idx) {
    this.panelBusiness[idx].style.transform = 'rotateY(180deg)';
    this.panelDetails[idx].style.transform = 'rotateY(0)';
    document.getElementById('map-' + idx).style.height = '300px';
    this.detailsWindows[idx].style.overflowY = 'scroll';
  };

  this.detailsToBusiness = function(idx) {
    this.panelDetails[idx].style.transform = 'rotateY(-180deg)';
    this.panelBusiness[idx].style.transform = 'rotateY(0)';
    this.detailsWindows[idx].style.overflowY = 'hidden';

  };

  this.businessToSocial = function(idx){
    this.panelSocial[idx].style.transform = 'rotateY(0)';
    this.panelBusiness[idx].style.transform = 'rotateY(-180deg)';
    this.socialWindows[idx].style.overflowY = 'scroll';
    document.getElementById('map-' + idx).style.height = 0;
  };

  this.socialToBusiness = function(idx){
    this.panelSocial[idx].style.transform = 'rotateY(180deg)';
    this.panelBusiness[idx].style.transform = 'rotateY(0)';
    this.socialWindows[idx].style.overflowY = 'hidden';
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
