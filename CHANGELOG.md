# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/).

## Unreleased

## v2.1.1 - 04/09/2019
This release fixes a bug introduced in `v2.1.0` — `debug@4` contains ES6 syntax that breaks compatibility with IE11. We now lock our `debug` dependency below version 4.
## v2.1.0 - 04/09/2019
This release moved to pulling `debug` directly from npm and bringing it into the host application via `ember-auto-import` rather than the AMD build of `debug-dist`.
## v2.0.0 - 10/02/2018
export function initialize(instance) {
  instance.register('debug-logger:main', debugLogger(), { instantiate: false });

  // Do this for each type you want the injection on
  instance.inject('route', 'debug', 'debug-logger:main');
}

export default {
  name: 'debug-logger',
  initialize,
};
```