'use strict';

var Buffer = require('buffer').Buffer;

var getCityNames = require('../getCityNames');

module.exports = function respond (res, query) {
  getCityNames(query.cities, query.targetLang, query.sourceLang)
    .then(function formatResponse (cities) {
      var responseObj = {};

      responseObj.cities = cities.reduce(function buildObject (obj, city, i) {
        obj[query.cities[i]] = city;

        return obj;
      }, {});

      responseObj.targetLang = query.targetLang;
      responseObj.sourceLang = query.sourceLang;

      return responseObj;
    })
    .then(function sendReponse (responseObj) {
      var responseText = JSON.stringify(responseObj);

      res.writeHead(200, {
        'Content-Length': Buffer.byteLength(responseText),
        'Content-Type': 'application/json; charset=utf-8'
      });

      res.write(responseText);

      res.end();
    })
    .fail(function sendError (err) {
      res.statusCode = 500;
      res.write('Something went wrong');
      res.end();

      console.log(err);
    });
};
