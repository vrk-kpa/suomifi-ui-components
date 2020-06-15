import React from 'react';
import { render, act } from '@testing-library/react';

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

  it('should have provided ids', () => {
    let dropdown: any;
    let label: any;
    act(() => {
      const { getAllByTestId } = render(BasicDropdown);
      dropdown = getAllByTestId('dropdown-test-id')[0];
      label = dropdown.getElementsByTagName('label')[0];
    });
    expect(dropdown).toHaveAttribute('id', 'test-id');
    expect(label).toHaveAttribute('id', 'test-id-label');
  });

  it('should have visual placeholder', () => {
    let button: any;
    act(() => {
      const { getAllByTestId } = render(BasicDropdown);
      const dropdown = getAllByTestId('dropdown-test-id')[0];
      button = dropdown.getElementsByTagName('button')[0];
    });
    expect(button).toHaveTextContent('Dropdown');
  });

  it('should match snapshot', () => {
    let container: any;
    act(() => {
      const { container: cont } = render(BasicDropdown);
      container = cont;
    });
    expect(container).toMatchSnapshot();
  });
});

describe('Dropdown with hidden label', () => {
  const hiddenProps: DropdownProps = {
    ...dropdownProps,
    labelMode: 'hidden',
  };
  const DropdownWithHiddenLabel = TestDropdown(
    hiddenProps,
    'dropdown-hidden-label-test-id',
  );

  it('should have hidden label', () => {
    let label: any;
    act(() => {
      const { getAllByText } = render(DropdownWithHiddenLabel);
      label = getAllByText('Dropdown test')[0];
    });
    expect(label).toHaveClass('fi-visually-hidden');
  });

  it('should match snapshot', () => {
    let container: any;
    act(() => {
      const { container: cont } = render(DropdownWithHiddenLabel);
      container = cont;
    });
    expect(container).toMatchSnapshot();
  });
});

describe('Dropdown with additional aria-label', () => {
  const additionalLabelProps: DropdownProps = {
    ...dropdownProps,
    'aria-labelledby': 'additional-label-id',
  };
  const DropdownWithExtraLabel = TestDropdown(additionalLabelProps);

  it('should have aria-labelledby composed from label-id and provided aria-labelledby prop', () => {
    let button: any;
    act(() => {
      const { getAllByRole } = render(DropdownWithExtraLabel);
      button = getAllByRole('button')[0];
    });
    expect(button.getAttribute('aria-labelledby')).toBe(
      'additional-label-id test-id-label',
    );
  });

  it('should match snapshot', () => {
    let container: any;
    act(() => {
      const { container: cont } = render(DropdownWithExtraLabel);
      container = cont;
    });
    expect(container).toMatchSnapshot();
  });
});

describe('Dropdown', () => {
  // Don't validate aria-attributes since Portal is not rendered and there is no pair for aria-controls
  it(
    'should not have basic accessibility issues',
    axeTest(TestDropdown(dropdownProps), {
      rules: {
        'aria-valid-attr-value': {
          enabled: false,
        },
      },
    }),
  );
});

test('CSS export', () => {
  const css = cssFromBaseStyles(baseStyles);
  expect(css).toEqual(expect.stringContaining('color'));
});
