'use strict';

window.onload = function() {

  (function() {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?key=' + process.env.GOOGLE_MAPS_KEY;
    document.body.appendChild(script);
  })();

};
