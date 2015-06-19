/* global sinon, debug */

import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'dummy/tests/helpers/start-app';

const { get, A, Service, Route } = Ember;

var application, container;

module('Acceptance | logging from container-managed objects', {
  beforeEach: function() {
    application = startApp();
    
    application.register('route:application', Route);
    application.register('service:my/test/module', Service);
    container = application.__container__;
    
    debug.enable('route:*, service:*');
    sinon.stub(console, 'log');
  },

  afterEach: function() {
    console.log.restore();
    debug.disable();
    Ember.run(application, 'destroy');
  }
});

test('it automatically finds keys when attached to container-managed objects', function(assert) {
  const appRoute = container.lookup('route:application');
  appRoute.debug('test message from the application route');

  let [routeMessage] = A(console.log.args).get('lastObject');
  assert.ok(/route:application/.test(routeMessage), 'Route message should include its container key');

  const testService = container.lookup('service:my/test/module');
  testService.debug('test message from the mysterious service');

  let [serviceMessage] = A(console.log.args).get('lastObject');
  assert.ok(/service:my\/test\/module/.test('service:my/test/module'), 'Service message should include its container key');
});
