// add some helpful assertions
require('jest-axe/extend-expect');

// // add some helpful assertions
require('@testing-library/jest-dom');

require('jest-styled-components');

/**
 * Replace useLayoutEffect with useEffect for jest to suppress unnecessary warnings "useLayoutEffect does nothing on server...".
 * We are using jest default environment JSDOM rather than node (for multiple reasons).
 * Custom useEnhanced hook handles SSR by using useEffect hook on node environments and useLayoutEffect on browser.
 * Due to issues between jest and react, useLayoutEffect gets picked up when using JSDOM but React assumes node env and issues unnecessary warnings.
 **/
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useLayoutEffect: jest.requireActual('react').useEffect,
}));

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Polyfill for TextEncoder and TextDecoder
const { TextEncoder, TextDecoder } = require('util');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
