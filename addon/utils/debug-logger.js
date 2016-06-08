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

/**
 * The default logging functions
 * @type {{debug: *, info: *, warn: *, error: *}}
 */
let LOGGERS = {
  'debug': console.log.bind(console),
  'info' : console.info.bind(console),
  'warn' : console.warn.bind(console),
  'error': console.error.bind(console)
};

/**
 * These functions wrap the loggers, so we can perform runtime lookups
 * of the loggers, and change them on the fly.
 * @type {{debug: (function(): *), info: (function(): *), warn: (function(): *), error: (function(): *)}}
 */
const WRAPPERS = {
  'debug': (...args) => LOGGERS['debug'](...args),
  'info' : (...args) => LOGGERS['info'](...args),
  'warn' : (...args) => LOGGERS['warn'](...args),
  'error': (...args) => LOGGERS['error'](...args)
};

/**
 * Replaces the logging function for the various log types.
 * Expects an object with keys of: debug, info, warn, or error
 * The values should be a function.
 *
 * @function overrideLoggers
 * @param {Object} loggers a hash as described above
 */
export function overrideLoggers(loggers) {
  LOGGERS = loggers;
  for (const type of Object.keys(loggers)) {
    LOGGERS[type] = loggers[type];
  }
}

/**
 * Creates an instance logger of type, type
 * @param type
 * @returns {Function}
 */
function createInstanceLogger(type) {
  return function () {
    let logger = this && this[`${type}InstanceLogger`];

    if (!logger) {
      const loggerKey = this && this._debugContainerKey;
      if (!loggerKey) {
        throw new Error('On non-container-managed objects, debug-logger requires an explicit key.');
      }

      logger     = window.debug(loggerKey);
      logger.log = WRAPPERS[type];

      Object.defineProperty(this, type, { value: logger });
    }

    return logger.apply(this, arguments);
  };
}

const instanceDebugLogger = createInstanceLogger('debug');
const instanceInfoLogger  = createInstanceLogger('info');
const instanceWarnLogger  = createInstanceLogger('warn');
const instanceErrorLogger = createInstanceLogger('error');

export function debugLogger(key) {
  return key ? window.debug(key) : instanceDebugLogger;
}


export function infoLogger() {
  return instanceInfoLogger;
}

export function warnLogger() {
  return instanceWarnLogger;
}

export function errorLogger() {
  return instanceErrorLogger;
}

export default debugLogger;
