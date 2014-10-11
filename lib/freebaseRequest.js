'use strict';

var https = require('https');
var Q = require('q');

module.exports = function freebaseRequest (options) {
  var deferred = Q.defer();

  console.log('GET:', 'https://' + options.hostname + options.path);

  var startTime = Date.now();

  var request = https.get(options, function onResponse (response) {
    response.setEncoding('utf8');

    var responseText = '';

    response.on('data', function onData (chunk) {
      responseText += chunk;
    });

    response.on('end', function onResponseEnd () {
      console.log(
        response.statusCode + ':',
        'https://' + options.hostname + options.path,
        (Date.now() - startTime) + 'ms'
      );

      if (response.statusCode === 200) {
        deferred.resolve(responseText);
      } else {
        deferred.reject(response);
      }
    });
  });

  request.on('error', function onError (e) {
    console.log(e);
    deferred.reject(e);
  });

  return deferred.promise;
};
