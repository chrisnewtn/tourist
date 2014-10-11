'use strict';

var tourist = require('../index');
var args = require('./parseArgs')(process.argv.slice(2));

tourist.config(args);

if (args.city && args.targetLang) {
  tourist.getCityName(args.city, args.targetLang).then(console.log);
}
