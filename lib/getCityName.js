'use strict';

var Q = require('q');
var freebaseRequest = require('./freebaseRequest');
var getRequestOptions = require('./getRequestOptions');
var cache = require('./cache');

function parseResponseText (responseText) {
  var responseJSON = JSON.parse(responseText);

  return responseJSON.result[0].name;
}

module.exports = function getCityName (city, targetLang, sourceLang) {
  var translation = cache.get(city, targetLang, sourceLang);

  if (translation) {
    console.log('CACHE:', sourceLang + ':', city, targetLang + ':', translation);
    return Q.resolve(translation);
  }

  var options = getRequestOptions(city, targetLang, sourceLang);

  return freebaseRequest(options).then(function (responseText) {
    translation = parseResponseText(responseText);

    cache.set(city, targetLang, sourceLang, translation);

    return translation;
  });
};
