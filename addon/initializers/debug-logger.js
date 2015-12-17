import debugLogger from 'ember-debug-logger/utils/debug-logger';

export function initialize(app) {
  app.register('debug-logger:main', debugLogger(), { instantiate: false });

  ['route', 'component', 'controller', 'service'].forEach(function(type) {
    app.inject(type, 'debug', 'debug-logger:main');
  });
}

export default {
  name: 'debug-logger',
  initialize: initialize
};
