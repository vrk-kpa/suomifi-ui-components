const env = !!process && !!process.env && process.env.NODE_ENV;
const dev =
  env !== 'production' &&
  (!!process.env.development ||
    env === 'development' ||
    env === 'dev' ||
    env === 'test');
const warn = !!dev && !!console && !!console.warn ? console.warn : () => null;

export const logger = {
  warn,
};
