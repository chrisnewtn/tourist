'use strict';

var cache = {};

var expiryTime = 1000 * 60 * 60 * 24;

function getKey (city, targetLang, sourceLang) {
  return [city, targetLang, sourceLang].join(';');
}

exports.get = function getItem (city, targetLang, sourceLang) {
  var key = getKey(city, targetLang, sourceLang);
  var item = cache[key];

  if(!item){
    return;
  }

  if((Date.now() - item.time) >= expiryTime){
    delete cache[key];
  }

  return item.translation;
};

exports.set = function setItem (city, targetLang, sourceLang, translation) {
  var key = getKey(city, targetLang, sourceLang);

  cache[key] = {
    translation: translation,
    time: Date.now()
  };
};
