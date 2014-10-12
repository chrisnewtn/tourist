'use strict';

var Buffer = require('buffer').Buffer;
var getCityNames = require('../getCityNames');

module.exports = function respond (res, query) {
  getCityNames(query.cities, query.targetLang, query.sourceLang)
    .then(function formatAndSendResponse (cities) {
      var responseObj = {
        cities: cities.reduce(function buildCities (obj, city, i) {
          obj[query.cities[i]] = city;

          return obj;
        }, {}),
        targetLang: query.targetLang,
        sourceLang: query.sourceLang
      };

      var responseText = JSON.stringify(responseObj);

      res.writeHead(200, {
        'Content-Length': Buffer.byteLength(responseText),
        'Content-Type': 'application/json; charset=utf-8'
      });

      res.end(responseText);
    })
    .fail(function sendError (err) {
      res.statusCode = 500;
      res.end('Something went wrong');

      console.log(err);
    });
};
