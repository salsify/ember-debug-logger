/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-debug-logger',

  init: function() {
    this._super.init && this._super.init.apply(this, arguments);

    var bowerDeps = this.project.bowerDependencies();
    if (bowerDeps['visionmedia-debug']) {
      this.ui.writeWarnLine('ember-debug-logger no longer requires the `visionmedia-debug` Bower package; please remove it.');
    }
  },

  options: {
    nodeAssets: {
      'debug-dist': {
        import: ['dist/debug.js']
      }
    }
  }
};
