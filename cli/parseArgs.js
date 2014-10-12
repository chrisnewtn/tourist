'use strict';

function camelCaseify (argKey) {
  var key = argKey.substring(argKey.indexOf('--') !== -1 ? 2 : 0);

  return key.replace(/-(\w)/g, function (match, letter) {
    return letter.toUpperCase();
  });
}

function parseArg (savedArgs, arg) {
  var splitArg = arg.split('=');
  var key = camelCaseify(splitArg[0]);
  var value = splitArg[1];

  savedArgs[key] = value !== undefined ? value : true;

  return savedArgs;
}

module.exports = function parseArgs (argv) {
  return argv.reduce(parseArg, {});
};
