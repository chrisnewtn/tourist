'use strict';

var assert = require('assert');
var index = require('../index');

describe('index', function () {
  it('exports the getCityName function', function () {
    assert.equal(index.getCityName, require('../lib/getCityName'));
  });

  it('exports the getCityNames function', function () {
    assert.equal(index.getCityNames, require('../lib/getCityNames'));
  });

  it('exports the config function', function () {
    assert.equal(index.config, require('../lib/config'));
  });

  it('exports the createServer function', function () {
    assert.equal(index.createServer, require('../lib/createServer'));
  });
});
