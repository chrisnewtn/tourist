'use strict';

var freebaseRequest = require('./freebaseRequest');
var getRequestOptions = require('./getRequestOptions');

function parseResponseText (responseText) {
  var responseJSON = JSON.parse(responseText);

  return responseJSON.result[0].name;
}

module.exports = function getCityName (city, targetLang, sourceLang) {
  var options = getRequestOptions(city, targetLang, sourceLang);

  return freebaseRequest(options).then(function (responseText) {
    return parseResponseText(responseText);
  });
};
