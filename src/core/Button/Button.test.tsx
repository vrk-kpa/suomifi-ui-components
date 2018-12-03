import React from 'react';
import { render } from 'react-testing-library';

import Button from './Button';

test('calling render with the same component on the same container does not remount', () => {
  const ButtonRendered = render(<Button>Test</Button>);
  const { getByTestId, rerender } = ButtonRendered;
  expect(getByTestId('button').textContent).toBe('Test');

  // re-render the same component with different props
  rerender(<Button>Test two</Button>);
  expect(getByTestId('button').textContent).toBe('Test two');
});
