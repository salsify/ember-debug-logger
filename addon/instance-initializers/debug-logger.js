import {debugLogger, errorLogger} from 'ember-debug-logger/utils/debug-logger';

export function initialize(instance) {
  // In 1.13, the app instance exposes the registry; in 2.x, it proxies it instead
  let registry = instance.register ? instance : instance.registry;
  let inject = registry.inject || registry.injection;

  registry.register('debug-logger:main', debugLogger(), { instantiate: false });
  registry.register('error-logger:main', errorLogger(), { instantiate: false });

  ['route', 'component', 'controller', 'service'].forEach(function(type) {
    inject.call(registry, type, 'debug', 'debug-logger:main');
    inject.call(registry, type, 'error', 'error-logger:main');
  });
}

export default {
  name: 'debug-logger',
  initialize: initialize
};
