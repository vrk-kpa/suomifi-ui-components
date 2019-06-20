const env = !!process && !!process.env && process.env.NODE_ENV;
const dev =
  env !== 'production' &&
  (!!process.env.development ||
    env === 'development' ||
    env === 'dev' ||
    env === 'test');
const ifConsole = !!dev && !!console;
const warn = ifConsole && !!console.warn ? console.warn : () => null;
const error = ifConsole && !!console.error ? console.error : () => null;

export const logger = {
  warn,
  error,
};
