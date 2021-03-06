import { A } from '@ember/array';
import debug from 'debug';
import debugLogger from 'ember-debug-logger';
import { module, test } from 'qunit';
import sinon, { SinonStub } from 'sinon';

module('Unit | Utility | debug logger', function(hooks) {
  let log: SinonStub;

  hooks.beforeEach(function() {
    debug.enable('test:sample-key');
    log = sinon.stub(console, 'log');
  });

  hooks.afterEach(function() {
    debug.disable();
    log.restore();
  });

  test('it honors an explicit key', function(assert) {
    const logger = debugLogger('test:sample-key');
    logger('placeholder message');

    let [message] = A(log.args).get('lastObject') || [''];
    assert.ok(/test:sample-key/.test(message), 'Log entry should contain the namespace');
    assert.ok(/placeholder message/.test(message), 'Log entry should contain the message');
  });

  test('it throws with a useful message when it can\'t determine a key', function(assert) {
    const logger = debugLogger();

    assert.throws(function() {
      logger('message');
    }, /explicit key/);

    assert.throws(function() {
      let object = { debug: logger };
      object.debug('message');
    }, /explicit key/);
  });
});
