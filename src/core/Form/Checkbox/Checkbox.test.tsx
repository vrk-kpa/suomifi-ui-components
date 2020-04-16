import React from 'react';
import { axeTest } from '../../../utils/test/axe';
import { Checkbox } from './Checkbox';

const createTestCheckbox = (
  large: boolean,
  error: boolean,
  defaultChecked: boolean,
  labelText: string,
  hint?: string,
  statusText?: string,
) => (
  <Checkbox
    variant={large ? 'large' : 'small'}
    defaultChecked={defaultChecked}
    status={error ? 'error' : 'default'}
    hintText={hint}
    statusText={statusText}
  >
    {labelText}
  </Checkbox>
);

const RegularTestCheckbox = createTestCheckbox(false, false, false, 'Regular');
const LargeTestCheckbox = createTestCheckbox(
  true,
  false,
  false,
  'Regular',
  'Take a hint',
);
const CheckedLargeTestCheckboxWithError = createTestCheckbox(
  true,
  true,
  false,
  'Large Checked with error',
  '',
  'EROR EROR',
);

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
