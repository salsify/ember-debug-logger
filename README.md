# ember-debug-logger [![Build Status](https://travis-ci.org/salsify/ember-debug-logger.svg?branch=master)](https://travis-ci.org/salsify/ember-debug-logger)

`ember-debug-logger` exposes the [visionmedia/debug](https://github.com/visionmedia/debug) library for use in your Ember.js application.

Installation
------------------------------------------------------------------------------

`ember install ember-debug-logger`

## Usage

The [debug library](https://github.com/visionmedia/debug) is available for standard use by import:

```js
import debug from 'debug';

const log = debug('demo-namespace');

log('Hello, world');
```

![image](https://cloud.githubusercontent.com/assets/108688/8261895/117445f0-169c-11e5-913e-941e82dd2a52.png)

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

Namespaces will automatically be differentiated by color, and the time between messages will be logged.

![image](https://cloud.githubusercontent.com/assets/108688/8263047/624cd006-16a5-11e5-9ba8-bd67d5ce5d7b.png)


### Automatic Namespacing

This addon exports a `debugLogger` function you can attach to a class definition. The resulting method will automatically use its instance's container key as the namespace.

```js
// app/routes/index.js
import Route from '@ember/route';
import debugLogger from 'ember-debug-logger';

export default Route.extend({
  debug: debugLogger();

  activate() {
    this.debug('Hello from the application index.');
  }
});
```

![image](https://cloud.githubusercontent.com/assets/108688/8262107/e0e71bb8-169d-11e5-9b74-9a895ed7e418.png)
