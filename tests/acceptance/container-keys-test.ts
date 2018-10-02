import Route from '@ember/routing/route';
import Service from '@ember/service';
import debug from 'debug';
import debugLogger from 'ember-debug-logger';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import sinon, { SinonStub } from 'sinon';
import { visit } from '@ember/test-helpers';
import { TestContext } from 'ember-test-helpers';

module('Acceptance | logging from container-managed objects', function(hooks) {
  let log: SinonStub;

  setupApplicationTest(hooks);

  hooks.beforeEach(function(this: TestContext) {
    this.owner.register('route:application', Route.extend({ debug: debugLogger() }), {});
    this.owner.register('service:my/test/module', Service.extend({ debug: debugLogger() }), {});

    debug.enable('route:*, service:*');
    log = sinon.stub(console, 'log');
  });

  hooks.afterEach(function() {
    log.restore();
    debug.disable();
  });

  test('it automatically finds keys when attached to container-managed objects', async function(assert) {
    await visit('/');

    const appRoute = this.owner.lookup('route:application');
    appRoute.debug('test message from the application route');

    let [routeMessage] = log.lastCall.args;
    assert.ok(/route:application/.test(routeMessage), 'Route message should include its container key');

    const testService = this.owner.lookup('service:my/test/module');
    testService.debug('test message from the mysterious service');

    let [serviceMessage] = log.lastCall.args;
    assert.ok(/service:my\/test\/module/.test(serviceMessage), 'Service message should include its container key');
  });
});
