import React from 'react';
import { axeTest } from '../../../utils/test/axe';
import { render } from '@testing-library/react';
import { Checkbox, CheckboxProps } from './Checkbox';

const BaseCheckbox = (props: CheckboxProps) => {
  const { id, children, ...passProps } = props;
  return (
    <Checkbox id="test" {...passProps}>
      {children}
    </Checkbox>
  );
};

const RegularTestCheckbox = (
  <BaseCheckbox data-testid="regular_id">Regular</BaseCheckbox>
);

const LargeTestCheckboxWithHintText = (
  <BaseCheckbox data-testid="large_id" variant="large" hintText="Take a hint">
    Large
  </BaseCheckbox>
);

const CheckedLargeTestCheckboxWithError = (
  <BaseCheckbox
    data-testid="largeError_id"
    variant="large"
    statusText="EROR EROR"
    defaultChecked
    status="error"
  >
    Large Checked with error
  </BaseCheckbox>
);

const DisabledTestCheckbox = (
  <BaseCheckbox data-testid="reguarlDisabled_id" disabled>
    Regular disabled
  </BaseCheckbox>
);

test('Calling render with the same component on the same container does not remount', () => {
  const checkboxRendered = render(RegularTestCheckbox);
  const { getByTestId, container, rerender } = checkboxRendered;
  expect(container.firstChild).toMatchSnapshot();
  expect(getByTestId('regular_id').textContent).toBe('Regular');

  // re-render the same component with different props
  rerender(
    <BaseCheckbox data-testid="regular_id_changed">
      Regular changed
    </BaseCheckbox>,
  );
  expect(getByTestId('regular_id_changed').textContent).toBe('Regular changed');
});

test(
  'Input should not have basic accessibility issues',
  axeTest(RegularTestCheckbox),
);

test(
  'Input should not have basic accessibility issues',
  axeTest(LargeTestCheckboxWithHintText),
);

test(
  'Input should not have basic accessibility issues',
  axeTest(CheckedLargeTestCheckboxWithError),
);

test(
  'Input should not have basic accessibility issues',
  axeTest(DisabledTestCheckbox),
);
