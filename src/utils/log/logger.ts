// Source: react-query, https://github.com/tannerlinsley/react-query/blob/c118513e833e92025af4205c29b7e043cd286531/src/core/logger.ts
// With minor changes for our use

type LogFunction = (...args: any[]) => void;

export interface Logger {
  log: LogFunction;
  warn: LogFunction;
  error: LogFunction;
}

// By default, do not log anything
const defaultLogger: Logger = {
  log: function log() {
    return;
  },
  warn: function warn() {
    return;
  },
  error: function error() {
    return;
  },
};

let logger: Logger = defaultLogger;

export function getLogger(): Logger {
  return logger;
}

export function setLogger(newLogger: Logger) {
  logger = newLogger;
}
