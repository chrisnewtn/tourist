'use strict';

var https = require('https');
var http = require('http');
var fs = require('fs');

var config = require('../config')();
var handleRequest = require('./handleRequest');

function getHttpsConfig () {
  if (!config.httpsKey && !config.httpsCert) {
    return false;
  }

  return {
    key: fs.readFileSync(config.httpsKey),
    cert: fs.readFileSync(config.httpsCert)
  };
}

module.exports = function createServer () {
  var httpsConfig = getHttpsConfig();

  if (httpsConfig) {
    return https.createServer(httpsConfig, handleRequest);
  }

  return http.createServer(handleRequest);
};
