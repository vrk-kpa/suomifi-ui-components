import React from 'react';
import { render } from '@testing-library/react';

import { Dropdown } from './Dropdown';
import { baseStyles } from './Dropdown.baseStyles';
import { cssFromBaseStyles } from '../utils';
import { axeTest } from '../../utils/test/axe';

const doNothing = () => ({});

const TestDropdown = (
  <Dropdown
    labelText="Dropdown test"
    className="dropdown-test"
    visualPlaceholder="Dropdown"
    id="test-id"
  >
    <Dropdown.item onSelect={doNothing}>Item 1</Dropdown.item>
    <Dropdown.item onSelect={doNothing}>Item 2</Dropdown.item>
  </Dropdown>
);

test('calling render with the same component on the same container does not remount', () => {
  const { container } = render(TestDropdown);
  expect(container).toMatchSnapshot();
});

// Don't validate aria-attributes since Portal is not rendered and there is no pair for aria-controls
test(
  'should not have basic accessibility issues',
  axeTest(TestDropdown, {
    rules: {
      'aria-valid-attr-value': {
        enabled: false,
      },
    },
  }),
);

test('CSS export', () => {
  const css = cssFromBaseStyles(baseStyles);
  expect(css).toEqual(expect.stringContaining('color'));
});
