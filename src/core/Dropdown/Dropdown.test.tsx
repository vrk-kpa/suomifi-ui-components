import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';

import { Dropdown, DropdownProps } from './Dropdown';
import { baseStyles } from './Dropdown.baseStyles';
import { cssFromBaseStyles } from '../utils';
import { axeTest } from '../../utils/test/axe';

const dropdownProps = {
  labelText: 'Dropdown test',
  name: 'dropdown-test',
  className: 'dropdown-test',
  visualPlaceholder: 'Dropdown',
  id: 'test-id',
};

const TestDropdown = (props: DropdownProps, testId?: string) => (
  <Dropdown {...props} data-testid={!!testId ? testId : ''}>
    <Dropdown.item value={'item-1'}>Item 1</Dropdown.item>
    <Dropdown.item value={'item-2'}>Item 2</Dropdown.item>
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
      const { getAllByRole } = render(BasicDropdown);
      button = getAllByRole('button')[0];
    });
    expect(button).toHaveTextContent('Dropdown');
  });

  // name attribute
  it('should have an input with provided name attribute', () => {
    let input: any;
    act(() => {
      const DropdownWithValue = TestDropdown({
        defaultValue: 'test-value',
        ...dropdownProps,
      });
      const { container } = render(DropdownWithValue);
      input = container.querySelector('input');
    });
    expect(input).toHaveValue('test-value');
    expect(input).toHaveAttribute('name', 'dropdown-test');
  });

  it('should match snapshot', async () => {
    const promise = Promise.resolve();
    const { container } = render(BasicDropdown);
    expect(container).toMatchSnapshot();
    await act(() => promise);
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

  it('should match snapshot', async () => {
    const promise = Promise.resolve();
    let container: any;
    act(() => {
      const { container: cont } = render(DropdownWithHiddenLabel);
      container = cont;
    });
    expect(container).toMatchSnapshot();
    await act(() => promise);
  });
});

describe('Controlled Dropdown', () => {
  const controlledDropdownProps = {
    labelText: 'Dropdown test',
    name: 'dropdown-test',
    className: 'dropdown-test',
    value: 'item-2',
    id: 'test-id',
  };
  const ControlledDropdown = TestDropdown(controlledDropdownProps);

  it('should have provided value selected', () => {
    let button: any;
    let input: any;
    act(() => {
      const { getAllByRole, container } = render(ControlledDropdown);
      button = getAllByRole('button')[0];
      input = container.querySelector('input');
    });
    expect(button).toHaveTextContent('Item 2');
    expect(input).toHaveValue('item-2');
  });

  it('should use value instead of internal state', async () => {
    const { findAllByRole, findByText, rerender, findByDisplayValue } = render(
      ControlledDropdown,
    );
    const button = await findAllByRole('button');
    const input = await findByDisplayValue('item-2');
    fireEvent.click(button[0]);
    const option = await findByText('Item 1');
    fireEvent.click(option);
    expect(button[0]).toHaveTextContent('Item 2');
    expect(input).toBeTruthy();

    act(() => {
      rerender(TestDropdown({ ...controlledDropdownProps, value: 'item-1' }));
    });
    const button2 = await findAllByRole('button');
    const input2 = await findByDisplayValue('item-1');
    expect(button2[0]).toHaveTextContent('Item 1');
    expect(input2).toBeTruthy();
  });

  it('should match snapshot', async () => {
    const promise = Promise.resolve();
    let container: any;
    act(() => {
      const { container: cont } = render(ControlledDropdown);
      container = cont;
    });
    expect(container).toMatchSnapshot();
    await act(() => promise);
  });
});

// action menu

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
    expect(button.getAttribute('aria-labelledby')).toContain(
      'additional-label-id test-id-label',
    );
  });

  it('should match snapshot', async () => {
    const promise = Promise.resolve();
    let container: any;
    act(() => {
      const { container: cont } = render(DropdownWithExtraLabel);
      container = cont;
    });
    expect(container).toMatchSnapshot();
    await act(() => promise);
  });
});

describe('Dropdown', () => {
  // Don't validate aria-attributes since Portal is not rendered and there is no pair for aria-controls
  it('should not have basic accessibility issues', async () => {
    await act(async () => {
      axeTest(TestDropdown(dropdownProps), {
        rules: {
          'aria-valid-attr-value': {
            enabled: false,
          },
        },
      });
    });
  });
});

test('CSS export', () => {
  const css = cssFromBaseStyles(baseStyles);
  expect(css).toEqual(expect.stringContaining('color'));
});
