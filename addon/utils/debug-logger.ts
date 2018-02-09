import debug, { IDebugger } from 'debug';

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
export default function debugLogger(key?: string): (formatter: any, ...args: any[]) => void {
  return key ? debug(key) : instanceLogger;
}

export function instanceLogger(this: LoggerContext | undefined) {
  let host = this;
  let logger = host && host._debugLoggerInstance;

  if (!logger) {
    const loggerKey = host && host._debugContainerKey;
    if (!loggerKey) {
      throw new Error('On non-container-managed objects, debug-logger requires an explicit key.');
    }

    logger = debug(loggerKey);

    Object.defineProperty(this, '_debugLoggerInstance', { value: logger });
  }

  return logger.apply(this, arguments);
}

export interface LoggerContext {
  _debugLoggerInstance?: IDebugger;
  _debugContainerKey?: string;
}

// For backwards compatibility and convenience in development, expose
// `debug` as a global to make e.g. `debug.enable('*')` easy.
// @ts-ignore
window.debug = debug;
