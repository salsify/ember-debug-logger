import Service from '@ember/service';
import Route from '@ember/routing/route';
import { getOwner } from '@ember/application';
import sinon, { SinonStub } from 'sinon';
import { test } from 'qunit';
import moduleForAcceptance from 'dummy/tests/helpers/module-for-acceptance';
import { TestContext } from 'ember-test-helpers';

let log: SinonStub;

moduleForAcceptance('Acceptance | logging from container-managed objects', {
  beforeEach(this: TestContext) {
    this.application.register('route:application', Route);
    this.application.register('service:my/test/module', Service);

    debug.enable('route:*, service:*');
    log = sinon.stub(console, 'log');
  },

  afterEach() {
    log.restore();
    debug.disable();
  }
});

test('it automatically finds keys when attached to container-managed objects', function(assert) {
  let lookup = (key: string) => (this.application as any).__container__.lookup(key);

  visit('/');

  andThen(() => {
    const appRoute = lookup('route:application');
    appRoute.debug('test message from the application route');

    let [routeMessage] = log.lastCall.args;
    assert.ok(/route:application/.test(routeMessage), 'Route message should include its container key');

    const testService = lookup('service:my/test/module');
    testService.debug('test message from the mysterious service');

    let [serviceMessage] = log.lastCall.args;
    assert.ok(/service:my\/test\/module/.test(serviceMessage), 'Service message should include its container key');
  });
});
