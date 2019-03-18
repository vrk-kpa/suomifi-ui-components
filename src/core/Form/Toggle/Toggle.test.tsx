import React from 'react';
import { render } from 'react-testing-library';

import { Toggle } from './Toggle';
import { cssFromBaseStyles } from '../../utils';
import { baseStyles } from './Toggle.baseStyles';

const doNothing = () => ({});

test('calling render with the same component on the same container does not remount', () => {
  const buttonRendered = render(
    <Toggle onClick={doNothing} data-testid="toggle">
      Test
    </Toggle>,
  );
  const { getByTestId, container, rerender } = buttonRendered;
  expect(container.firstChild).toMatchSnapshot();
  expect(getByTestId('toggle').textContent).toBe('Test');

  // re-render the same component with different props
  rerender(
    <Toggle onClick={doNothing} data-testid="elggot">
      Test two
    </Toggle>,
  );
  expect(getByTestId('elggot').textContent).toBe('Test two');
});

test('CSS export', () => {
  const css = cssFromBaseStyles(baseStyles);
  expect(css).toEqual(expect.stringContaining('cursor'));
});
