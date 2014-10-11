'use strict';

var Q = require('q');
var getCityName = require('./getCityName');

module.exports = function getCityNames(cities, targetLang, sourceLang){
  return Q.all(cities.map(function (city) {
    return getCityName(city, targetLang, sourceLang);
  }));
};
