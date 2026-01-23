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

/**
 * Global cleanup to prevent test pollution
 * This ensures that state doesn't leak between tests
 */
afterEach(() => {
  // Clean up any portal content that might have been created
  // This is important for components like Modal, Dropdown, Select
  const portals = document.querySelectorAll('[class*="fi-modal_base"]');
  portals.forEach((portal) => {
    if (portal.parentNode) {
      portal.parentNode.removeChild(portal);
    }
  });

  // Clean up floating-ui portals (used by Dropdown, Select, SearchInput)
  const floatingUiPortals = document.querySelectorAll(
    '[data-floating-ui-portal]',
  );
  floatingUiPortals.forEach((portal) => {
    if (portal.parentNode) {
      portal.parentNode.removeChild(portal);
    }
  });

  // Clean up any stray aria-hidden attributes
  // Some components might set this on the root element
  const appRoot = document.getElementById('root');
  if (appRoot) {
    appRoot.removeAttribute('aria-hidden');
  }

  // Clear any focus that might be set
  // This prevents focus from leaking between tests
  if (document.activeElement && document.activeElement !== document.body) {
    if (typeof document.activeElement.blur === 'function') {
      document.activeElement.blur();
    }
  }

  // Clean up timers to prevent leakage between tests
  // NOTE: Tests that use beforeAll/afterAll for suite-level timer management
  // (like DateInput.test.tsx) should use afterEach to re-establish their timers
  if (jest.isMockFunction(setTimeout)) {
    // Only clean up if we're in fake timer mode
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  }
  jest.clearAllTimers();
});

/**
 * Add helpful debugging information when tests fail
 */
let currentTest = null;

beforeEach(() => {
  currentTest = expect.getState().currentTestName;
});

// Add custom matchers or global test helpers here
global.testDebug = {
  getCurrentTest: () => currentTest,
  logDOM: (element, message) => {
    if (process.env.DEBUG_TESTS) {
      console.log(message ? `\n=== ${message} ===` : '\n=== DOM ===');
      console.log(element ? element.innerHTML : document.body.innerHTML);
      console.log('=================\n');
    }
  },
  logTimers: () => {
    if (process.env.DEBUG_TESTS) {
      console.log('Pending timers:', jest.getTimerCount());
    }
  },
};
