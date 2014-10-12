'use strict';

var tourist = require('../index');
var args = require('./parseArgs')(process.argv.slice(2));

var config = tourist.config(args);

if (args.serve && args.port && args.hostname) {
  tourist.createServer().listen(parseInt(args.port, 10), args.hostname);

  console.log('tourist listening on port', args.port, 'on host', args.hostname);

  return;
}

if (args.city && args.targetLang) {
  tourist.getCityName(args.city, args.targetLang).then(console.log);
}
