import React from 'react';
import { render } from '@testing-library/react';

import { Button } from './Button';

test('calling render with the same component on the same container does not remount', () => {
  const buttonRendered = render(<Button data-testid="button">Test</Button>);
  const { getByTestId, container, rerender } = buttonRendered;
  expect(container.firstChild).toMatchSnapshot();
  expect(getByTestId('button').textContent).toBe('Test');

  // re-render the same component with different props
  rerender(<Button data-testid="nottub">Test two</Button>);
  expect(getByTestId('nottub').textContent).toBe('Test two');
});
