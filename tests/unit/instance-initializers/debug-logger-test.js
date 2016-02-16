import Ember from 'ember';
import { initialize } from '../../../instance-initializers/debug-logger';
import { module, test } from 'qunit';

var container, application;

module('Unit | Instance Initializer | debug logger', {
  beforeEach: function() {
    Ember.run(function() {
      application = Ember.Application.create();
      container = application.__container__;
      application.deferReadiness();
    });
  }
});

test('it registers the logger on the expected types', function(assert) {
  const TYPES = ['component', 'route', 'controller', 'service'];

  initialize(application);

  TYPES.forEach(function(type) {
    const key = `${type}:injection-test`;

    application.register(key, Ember.Object);
    const instance = container.lookup(key);

    assert.ok(instance.debug instanceof Function, `The debug logger should be registered on ${type} instances`);
  });
});
