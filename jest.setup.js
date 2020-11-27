// add some helpful assertions
require('jest-axe/extend-expect');

// add some helpful assertions
require('@testing-library/jest-dom/extend-expect');

require('jest-styled-components');

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useLayoutEffect: jest.requireActual('react').useEffect,
}));
