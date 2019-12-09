import React from 'react';
import { render } from 'react-testing-library';

import { Colors } from './Colors';

test('check that snapshot matches', () => {
  const colorsRendered = render(<Colors />);
  const { container } = colorsRendered;

  expect(container.firstChild).toMatchSnapshot();
});
