# ember-debug-logger

`ember-debug-logger` exposes the [visionmedia/debug](//github.com/visionmedia/debug) library for use in your Ember.js application.

## Installation

`ember install ember-debug-logger`

## Usage

### Enabling Namespaces During Debugging

During development, you can enable logging for particular namespaces calling `debug.enable` in the developer console. Your preferences will be persisted in local storage, but they're only checked when a logger is instantiated, so in most cases you'll need to refresh the page to see them take effect.

Enabled namespaces follow simple globbing rules, so to enable logging for everything, you could use:

```js
debug.enable('*');
```

To enable only logging coming from the application route:

```js
debug.enable('route:application');
```

You can mix and match as well. To enable logging for all routes and the `foo-bar` service, for instance:

```js
debug.enable('route:*, service:foo-bar');
```

You can turn off all logging with `disable`:

```
debug.disable();
```

### Automatic Namespacing

By default, this addon will inject a `debug` method on to all routes, components, controllers, and services that are instantiated by your application's container. This method will automatically use its instance's container key as the namespace.

```js
// index/route.js
import Ember from 'ember';

export default Ember.Route.extend({
  activate() {
    this.debug('Hello from the application index.');
  }
});
```

![image](https://cloud.githubusercontent.com/assets/108688/8262107/e0e71bb8-169d-11e5-9b74-9a895ed7e418.png)


You can also manually add the method when defining any other class that will be instantiated by the container.

```js
import Ember from 'ember';
import DS from 'ember-data';
import debugLogger from 'ember-debug-logger';

export default DS.RESTAdapter.extend({
  debug: debugLogger(),
  
  _sayHi: Ember.on('init', function() {
    this.debug('Hello from the application adapter!');
  })
});
```

![image](https://cloud.githubusercontent.com/assets/108688/8262918/52e85f82-16a4-11e5-9b00-22e95e3848ae.png)


### Manual Namespacing

If you want to log debug messages from anywhere other than a container-managed object, you can manually specify a namespace in the same way you would with the [underlying `debug` library](//github.com/visionmedia/debug).

```js
import debugLogger from 'ember-debug-logger';
const debug = debugLogger('demo-namespace');

debug('Hello, world');
```

![image](https://cloud.githubusercontent.com/assets/108688/8261895/117445f0-169c-11e5-913e-941e82dd2a52.png)
