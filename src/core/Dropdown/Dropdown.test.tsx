import React from 'react';
import { render, screen } from '@testing-library/react';

import { Dropdown, DropdownProps } from './Dropdown';
import { baseStyles } from './Dropdown.baseStyles';
import { cssFromBaseStyles } from '../utils';
import { axeTest } from '../../utils/test/axe';

const doNothing = () => ({});

const dropdownProps = {
  labelText: 'Dropdown test',
  className: 'dropdown-test',
  visualPlaceholder: 'Dropdown',
  id: 'test-id',
};

const TestDropdown = (props: DropdownProps, testId?: string) => (
  <Dropdown {...props} data-testid={!!testId ? testId : ''}>
    <Dropdown.item onSelect={doNothing}>Item 1</Dropdown.item>
    <Dropdown.item onSelect={doNothing}>Item 2</Dropdown.item>
  </Dropdown>
);

describe('Basic dropdown', () => {
  const BasicDropdown = TestDropdown(dropdownProps, 'dropdown-test-id');
  const { container } = render(BasicDropdown);

  test('should match snapshot', () => {
    expect(container).toMatchSnapshot();
  });

  const dropdowns = screen.getAllByTestId('dropdown-test-id');

  test('should have provided ids', () => {
    dropdowns.forEach((dropdown) => {
      expect(dropdown).toHaveAttribute('id', 'test-id');
      const labels = dropdown.getElementsByTagName('label');
      expect(labels[0]).toHaveAttribute('id', 'test-id-label');
    });
  });

  test('should have visual placeholder', () => {
    dropdowns.forEach((dropdown) => {
      const buttons = dropdown.getElementsByTagName('button');
      expect(buttons[0]).toHaveTextContent('Dropdown');
    });
  });

  test('should open menu when clicked', () => {
    expect(container).toBeTruthy();
  });
});

describe('Dropdown with hidden label', () => {
  const hiddenProps: DropdownProps = {
    labelMode: 'hidden',
    ...dropdownProps,
  };
  const DropdownWithHiddenLabel = TestDropdown(hiddenProps);
  const { container } = render(DropdownWithHiddenLabel);

  test('should have visually hidden label', () => {
    // have hidden label
    // have placeholder
    expect(container).toMatchSnapshot();
  });
});

describe('additional label', () => {
  const additionalLabelProps: DropdownProps = {
    'aria-labelledby': 'test-label-id',
    ...dropdownProps,
  };
  const TestDropdownWithExtraLabel = TestDropdown(additionalLabelProps);
  const { container } = render(TestDropdownWithExtraLabel);

  test('using aria-labelledby prop should attach provided label-id', () => {
    // have both, internal and provided label-id in aria-labelledby
    expect(container).toMatchSnapshot();
  });
});

// Don't validate aria-attributes since Portal is not rendered and there is no pair for aria-controls
test(
  'should not have basic accessibility issues',
  axeTest(TestDropdown(dropdownProps), {
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
