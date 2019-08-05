import React from 'react';
import server from 'react-dom/server';
import { render } from 'react-testing-library';
import { axe } from 'jest-axe';

import { Button } from './Button';
import { cssFromBaseStyles } from '../utils';
import { baseStyles } from './Button.baseStyles';

test('calling render with the same component on the same container does not remount', () => {
  const buttonRendered = render(<Button data-testid="button">Test</Button>);
  const { getByTestId, container, rerender } = buttonRendered;
  expect(container.firstChild).toMatchSnapshot();
  expect(getByTestId('button').textContent).toBe('Test');

  // re-render the same component with different props
  rerender(<Button data-testid="nottub">Test two</Button>);
  expect(getByTestId('nottub').textContent).toBe('Test two');
});

test('should not have basic accessibility issues', async () => {
  const html = server.renderToString(
    <Button data-testid="button">Test</Button>,
  );
  const results = await axe(html);
  expect(results).toHaveNoViolations();
});

test('CSS export', () => {
  const css = cssFromBaseStyles(baseStyles);
  expect(css).toEqual(expect.stringContaining('color'));
});
