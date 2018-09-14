/* eslint-env node */
'use strict';

module.exports = {
  name: require('./package').name,

  included() {
    this._super.included.apply(this, arguments);
    this.import('vendor/debug-dist/dist/debug.js', {
      using: [{ transformation: 'amd', as: 'debug' }]
    });
  },

  options: {
    nodeAssets: {
      'debug-dist': {
        vendor: ['dist/debug.js']
      }
    }
  }
};
