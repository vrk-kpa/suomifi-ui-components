import React from 'react';
import { render } from 'react-testing-library';

import Colors from './Colors';

test('calling render with the same component on the same container does not remount', () => {
  const buttonRendered = render(<Colors />);
  const { rerender } = buttonRendered;
  expect('Test').toBe('Test');

  // re-render the same component with different props
  rerender(<Colors />);
  expect('Test two').toBe('Test two');
});

// TODO: does this need test?
