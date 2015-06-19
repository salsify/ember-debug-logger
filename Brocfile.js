/* jshint node: true */
/* global require, module */

var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
var app = new EmberAddon();

app.import({ test: 'bower_components/sinonjs/sinon.js' });

module.exports = app.toTree();
