'use strict';

var querystring = require('querystring');
var config = require('./config')();

module.exports = function getRequestOptions (city, targetLang, sourceLang) {
  var queryObject = {
    query: city,
    lang: targetLang + ',' + (sourceLang || config.defaultSourceLang || 'en'),
    filter: '(any type:/location/citytown type:/location/country)'
  };

  if (config.freebaseApiKey) {
    queryObject.key = config.freebaseApiKey;
  }

  return {
    hostname: 'www.googleapis.com',
    path: '/freebase/v1/search?' + querystring.stringify(queryObject)
  };
};
