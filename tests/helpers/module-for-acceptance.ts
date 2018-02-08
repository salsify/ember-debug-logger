import { TestContext } from 'ember-test-helpers';
import { module } from 'qunit';
import { resolve } from 'rsvp';
import destroyApp from '../helpers/destroy-app';
import startApp from '../helpers/start-app';

export default function(name: string, options: Hooks = {}) {
  module(name, {
    beforeEach(this: TestContext) {
      this.application = startApp();

      if (options.beforeEach) {
        return options.beforeEach.apply(this, arguments);
      }
    },

    afterEach(this: TestContext) {
      let afterEach = options.afterEach && options.afterEach.apply(this, arguments);
      return resolve(afterEach).then(() => destroyApp(this.application));
    },
  });
}
