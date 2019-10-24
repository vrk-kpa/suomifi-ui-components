import React from 'react';
import { render } from 'react-testing-library';
import { axeTest } from '../../../utils/test/axe';

import { Toggle } from './Toggle';

const doNothing = () => ({});

const TestToggleWithInput = (
  <Toggle
    onClick={doNothing}
    data-testid="toggle"
    id="test-toggle"
    withInput={true}
  >
    Test
  </Toggle>
);

const TestToggleWithButton = (
  <Toggle onClick={doNothing} data-testid="toggle" id="test-toggle">
    Test
  </Toggle>
);

test('Input: calling render with the same component on the same container does not remount', () => {
  const toggleInputRendered = render(TestToggleWithInput);
  const { getByTestId, container, rerender } = toggleInputRendered;
  expect(container.firstChild).toMatchSnapshot();
  expect(getByTestId('toggle').textContent).toBe('Test');

  // re-render the same component with different props
  rerender(
    <Toggle onClick={doNothing} data-testid="elggot" withInput={true}>
      Test two
    </Toggle>,
  );
  expect(getByTestId('elggot').textContent).toBe('Test two');
});

test('Button: calling render with the same component on the same container does not remount', () => {
  const toggleButtonRendered = render(TestToggleWithButton);
  const { getByTestId, container, rerender } = toggleButtonRendered;
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

test(
  'Input: should not have basic accessibility issues',
  axeTest(TestToggleWithInput),
);

test(
  'Button: should not have basic accessibility issues',
  axeTest(TestToggleWithButton),
);
