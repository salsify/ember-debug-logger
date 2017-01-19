/* global debug */
/* eslint no-console:off */

import Ember from 'ember';
import sinon from 'sinon';
import { test } from 'qunit';
import moduleForAcceptance from 'dummy/tests/helpers/module-for-acceptance';

const { Service, Route } = Ember;

moduleForAcceptance('Acceptance | logging from container-managed objects', {
  beforeEach: function() {
    this.application.register('route:application', Route);
    this.application.register('service:my/test/module', Service);
    this.container = this.container || this.application.__container__;

    debug.enable('route:*, service:*');
    sinon.stub(console, 'log');
  },

  afterEach: function() {
    console.log.restore();
    debug.disable();
  }
});

test('it automatically finds keys when attached to container-managed objects', function(assert) {
  visit('/');

  andThen(() => {
    const appRoute = this.container.lookup('route:application');
    appRoute.debug('test message from the application route');

    let [routeMessage] = console.log.lastCall.args;
    assert.ok(/route:application/.test(routeMessage), 'Route message should include its container key');

    const testService = this.container.lookup('service:my/test/module');
    testService.debug('test message from the mysterious service');

    let [serviceMessage] = console.log.lastCall.args;
    assert.ok(/service:my\/test\/module/.test(serviceMessage), 'Service message should include its container key');
  });
});
