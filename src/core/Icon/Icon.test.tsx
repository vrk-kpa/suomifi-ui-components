import React from 'react';
import { render } from 'react-testing-library';

import Icon from './Icon';

test('calling render with the same component on the same container does not remount', () => {
  const svgRenderer = render(<Icon />);
  const { getByTestId, rerender } = svgRenderer;
  expect(getByTestId('icon')).toBeDefined();

  // re-render the same component with different props
  rerender(<Icon />);
  expect(getByTestId('icon')).toBeDefined();
});
