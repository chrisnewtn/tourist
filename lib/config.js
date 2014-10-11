'use strict';

var config = {
  defaultSourceLang: 'en',
  freebaseApiKey: ''
};

var configKeys = Object.keys(config);

module.exports = function parseConfig (newConfig) {
  if (!newConfig) {
    return config;
  }

  Object.keys(newConfig).forEach(function parseKey (key) {
    if (configKeys.indexOf(key) === -1){
      return;
    }

    config[key] = newConfig[key];
  });

  return config;
};
