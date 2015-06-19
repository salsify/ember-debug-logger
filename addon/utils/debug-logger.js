/**
 * Creates a function for debug logging, keyed by either an explicitly-given
 * namespace or the container key of the object it's attached to.
 *
 * Logging can then be enabled during debugging based on globbing of keys.
 * For instance, to enable logging for all routes, you could enter this in the
 * developer console:
 *   debug.enable('route:*');
 *
 * Or, to enable all logging:
 *   debug.enable('*');
 *
 * Logging preferences are persisted in local storage, and you'll need to reload
 * the page for changes to take effect.
 */
export default function debugLogger(key) {
  return key ? window.debug(key) : instanceLogger;
}

const LOGGER = '_debugLoggerInstance';

export function instanceLogger() {
  let logger = this && this[LOGGER];

  if (!logger) {
    const loggerKey = this && this._debugContainerKey;
    if (!loggerKey) {
      throw new Error('On non-container-managed objects, debug-logger requires an explicit key.');
    }

    logger = window.debug(loggerKey);

    Object.defineProperty(this, LOGGER, { value: logger });
  }

  return logger.apply(this, arguments);
}
