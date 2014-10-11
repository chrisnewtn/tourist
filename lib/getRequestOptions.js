'use strict';

var querystring = require('querystring');

module.exports = function getRequestOptions (city, targetLang, sourceLang) {
  var query = querystring.stringify({
    query: city,
    lang: targetLang + ',' + (sourceLang || 'en'),
    filter: '(any type:/location/citytown type:/location/country)'
  });

  return {
    hostname: 'www.googleapis.com',
    path: '/freebase/v1/search?' + query
  };
};
