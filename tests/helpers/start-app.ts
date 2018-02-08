import App from 'dummy/app';
import config from 'dummy/config/environment';
import { merge } from '@ember/polyfills';
import { run } from '@ember/runloop';
import { TestContext } from 'ember-test-helpers';

export default function startApp(attrs?: any): App {
  let attributes = merge({}, config.APP);
  attributes.autoboot = true;
  attributes = merge(attributes, attrs); // use defaults, but you can override;

  return run(() => {
    let application = App.create(attributes);
    application.setupForTesting();
    application.injectTestHelpers();
    return application as App;
  });
}
