'use strict';

window.onload = function() {

  (function() {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?key=' + __GOOGLE_MAPS_KEY__;
    document.body.appendChild(script);
  })();

};
