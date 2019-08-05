import React from 'react';
import { render } from 'react-testing-library';
import { axeTest } from '../../utils/test/axe';

import { Button } from './Button';
import { cssFromBaseStyles } from '../utils';
import { baseStyles } from './Button.baseStyles';

const TestButton = <Button data-testid="button">Test</Button>;

test('calling render with the same component on the same container does not remount', () => {
  const buttonRendered = render(TestButton);
  const { getByTestId, container, rerender } = buttonRendered;
  expect(container.firstChild).toMatchSnapshot();
  expect(getByTestId('button').textContent).toBe('Test');

  // re-render the same component with different props
  rerender(<Button data-testid="nottub">Test two</Button>);
  expect(getByTestId('nottub').textContent).toBe('Test two');
});

test('should not have basic accessibility issues', axeTest(TestButton));

test('CSS export', () => {
  const css = cssFromBaseStyles(baseStyles);
  expect(css).toEqual(expect.stringContaining('color'));
});
