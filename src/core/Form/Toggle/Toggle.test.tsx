import React from 'react';
import { render } from '@testing-library/react';
import { axeTest } from '../../../utils/test/axe';

import { Toggle } from './Toggle';

const doNothing = () => ({});

const CreateTestToggle = (
  withInput: boolean,
  text: string,
  dataTestId: string,
) => (
  <Toggle
    onClick={doNothing}
    data-testid={dataTestId}
    id="test-toggle"
    variant={withInput ? 'withInput' : 'default'}
  >
    {text}
  </Toggle>
);

const TestToggleWithInput = CreateTestToggle(true, 'Test', 'toggle');
const TestToggleWithButton = CreateTestToggle(false, 'Test', 'toggle');

test('Input: calling render with the same component on the same container does not remount', () => {
  const toggleInputRendered = render(TestToggleWithInput);
  const { getByTestId, container, rerender } = toggleInputRendered;
  expect(container.firstChild).toMatchSnapshot();
  expect(getByTestId('toggle').textContent).toBe('Test');

  // re-render the same component with different props
  rerender(CreateTestToggle(true, 'Test two', 'elggot'));
  expect(getByTestId('elggot').textContent).toBe('Test two');
});

test('Button: calling render with the same component on the same container does not remount', () => {
  const toggleButtonRendered = render(TestToggleWithButton);
  const { getByTestId, container, rerender } = toggleButtonRendered;
  expect(container.firstChild).toMatchSnapshot();
  expect(getByTestId('toggle').textContent).toBe('Test');

  // re-render the same component with different props
  rerender(CreateTestToggle(false, 'Test two', 'elggot'));
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
