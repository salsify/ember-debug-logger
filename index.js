/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-debug-logger',

  included: function(app) {
    if (!app.import) {
      throw new Error('ember-debug-logger does not currently support being used in addons');
    }

    app.import(app.bowerDirectory + '/visionmedia-debug/dist/debug.js');
  }
};
