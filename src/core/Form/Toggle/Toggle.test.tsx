import React from 'react';
import { render } from 'react-testing-library';
import { axeTest } from '../../../utils/test/axe';

import { Toggle } from './Toggle';

const doNothing = () => ({});

const TestToggle = (
  <Toggle onClick={doNothing} data-testid="toggle" id="test-toggle">
    Test
  </Toggle>
);

test('calling render with the same component on the same container does not remount', () => {
  const buttonRendered = render(TestToggle);
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

test('should not have basic accessibility issues', axeTest(TestToggle));
