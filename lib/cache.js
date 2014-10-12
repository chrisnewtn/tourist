'use strict';

var cache = {};

var expiryTime = 1000 * 60 * 60 * 24;

function getKey (city, targetLang, sourceLang) {
  return [city, targetLang, sourceLang].join(';');
}

exports.get = function getItem (city, targetLang, sourceLang) {
  return cache[getKey(city, targetLang, sourceLang)];
};

exports.set = function setItem (city, targetLang, sourceLang, translation) {
  var key = getKey(city, targetLang, sourceLang);

  cache[key] = translation;

  setTimeout(function removeItem () {
    delete cache[key];
  }, expiryTime);
};
