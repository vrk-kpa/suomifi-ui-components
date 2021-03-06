import React from 'react';
import { render } from '@testing-library/react';

import { Colors } from './Colors';

test('check that snapshot matches', () => {
  const colorsRendered = render(<Colors />);
  const { container } = colorsRendered;

  expect(container.firstChild).toMatchSnapshot();
});
