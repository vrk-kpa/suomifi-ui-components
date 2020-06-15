import React from 'react';
import { axeTest } from '../../../utils/test/axe';
import { render } from '@testing-library/react';
import { Checkbox } from './Checkbox';

const createTestCheckbox = (
  large: boolean,
  error: boolean,
  defaultChecked: boolean,
  labelText: string,
  hint?: string,
  statusText?: string,
  dataTestId?: string,
  disabled?: boolean,
) => (
  <Checkbox
    variant={large ? 'large' : 'small'}
    defaultChecked={defaultChecked}
    status={error ? 'error' : 'default'}
    hintText={hint}
    statusText={statusText}
    data-testid={dataTestId}
    id="test"
    disabled={disabled}
  >
    {labelText}
  </Checkbox>
);

const RegularTestCheckbox = createTestCheckbox(
  false,
  false,
  false,
  'Regular',
  undefined,
  undefined,
  'regular_id',
  false,
);
const LargeTestCheckbox = createTestCheckbox(
  true,
  false,
  false,
  'Large',
  'Take a hint',
  undefined,
  'large_id',
  false,
);
const CheckedLargeTestCheckboxWithError = createTestCheckbox(
  true,
  true,
  true,
  'Large Checked with error',
  undefined,
  'EROR EROR',
  'largeError_id',
  false,
);

const DisabledTestCheckbox = createTestCheckbox(
  false,
  false,
  false,
  'Regular',
  undefined,
  undefined,
  'regular_id',
  true,
);

test('Calling render with the same component on the same container does not remount', () => {
  const checkboxRendered = render(RegularTestCheckbox);
  const { getByTestId, container, rerender } = checkboxRendered;
  expect(container.firstChild).toMatchSnapshot();
  expect(getByTestId('regular_id').textContent).toBe('Regular');

  // re-render the same component with different props
  rerender(
    createTestCheckbox(
      false,
      false,
      false,
      'Regular changed',
      undefined,
      undefined,
      'regular_id_changed',
    ),
  );
  expect(getByTestId('regular_id_changed').textContent).toBe('Regular changed');
});

test(
  'Input should not have basic accessibility issues',
  axeTest(RegularTestCheckbox),
);

test(
  'Input should not have basic accessibility issues',
  axeTest(LargeTestCheckbox),
);

test(
  'Input should not have basic accessibility issues',
  axeTest(CheckedLargeTestCheckboxWithError),
);

test(
  'Input should not have basic accessibility issues',
  axeTest(DisabledTestCheckbox),
);
