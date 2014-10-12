'use strict';

var respond = require('./respond');

function sendError (res, errorMessage) {
  res.statusCode = 400;
  res.write(errorMessage);
  res.end();
}

module.exports = function handleRequest (req, res) {
  var requestText = '';

  req.on('data', function appendData (data) {
    requestText += data;
  });

  req.on('end', function parseRequestText () {
    try {
      var requestQuery = JSON.parse(requestText);
    } catch (e) {
      return sendError(res, 'Error parsing query as JSON');
    }

    if (!requestQuery.cities || !requestQuery.cities.length) {
      return sendError(res, 'cities property undefined or empty');
    }

    if (!requestQuery.targetLang) {
      return sendError(res, 'targetLang not specified');
    }

    if (!requestQuery.sourceLang) {
      requestQuery.sourceLang = 'en';
    }

    respond(res, requestQuery);
  });
}
