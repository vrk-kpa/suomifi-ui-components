import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';

import { Dropdown, DropdownProps } from './Dropdown';
import { DropdownItem } from '../DropdownItem/DropdownItem';
import { axeTest } from '../../../utils/test';

const dropdownProps = {
  labelText: 'Dropdown test',
  name: 'dropdown-test',
  className: 'dropdown-test',
  visualPlaceholder: 'Dropdown',
  id: 'test-id',
};

const TestDropdown = (props: DropdownProps, testId?: string) => (
  <Dropdown {...props} data-testid={!!testId ? testId : ''}>
    <DropdownItem value={'item-1'}>Item 1</DropdownItem>
    <DropdownItem value={'item-2'}>Item 2</DropdownItem>
  </Dropdown>
);

describe('Basic dropdown', () => {
  const BasicDropdown = TestDropdown(dropdownProps, 'dropdown-test-id');

  it('should have provided ids', async () => {
    const { findByTestId } = render(BasicDropdown);
    const dropdown = await findByTestId('dropdown-test-id');
    const label = await dropdown.getElementsByTagName('label')[0];
    expect(dropdown).toHaveAttribute('id', 'test-id');
    expect(label).toHaveAttribute('id', 'test-id-label');
  });

  it('should have visual placeholder', async () => {
    const { findByRole } = render(BasicDropdown);
    const button = await findByRole('button');
    expect(button).toHaveTextContent('Dropdown');
  });

  // name attribute
  it('should have an input with provided name attribute', async () => {
    const DropdownWithValue = TestDropdown({
      defaultValue: 'test-value',
      ...dropdownProps,
    });
    const { findByDisplayValue } = render(DropdownWithValue);
    const input = await findByDisplayValue('test-value');
    expect(input).toBeTruthy();
    expect(input).toHaveAttribute('name', 'dropdown-test');
  });

  it('should have disabled styles when disabled', async () => {
    const { container } = render(
      <Dropdown labelText="Dropdown" disabled>
        <DropdownItem value={'item-1'}>Item 1</DropdownItem>
      </Dropdown>,
    );
    const outerSpan = container.getElementsByClassName('fi-dropdown')[0];
    console.log(outerSpan);
    expect(outerSpan).toHaveClass('fi-dropdown--disabled');
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

  it('should have hidden label', async () => {
    const { findByText } = render(DropdownWithHiddenLabel);
    const label = await findByText('Dropdown test');
    expect(label).toHaveClass('fi-visually-hidden');
  });

  it('should match snapshot', async () => {
    const promise = Promise.resolve();
    const { container } = render(DropdownWithHiddenLabel);
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

  it('should have provided value selected', async () => {
    const { findByRole, findByDisplayValue } = render(ControlledDropdown);
    const button = await findByRole('button');
    const input = await findByDisplayValue('item-2');
    expect(button).toHaveTextContent('Item 2');
    expect(input).toBeTruthy();
  });

  it('should use value instead of internal state', async () => {
    const { findByRole, rerender, findByDisplayValue, baseElement } =
      render(ControlledDropdown);
    const button = await findByRole('button');
    const input = await findByDisplayValue('item-2');

    fireEvent.click(button);
    const option = baseElement.querySelector('.fi-dropdown_item'); // Item 1
    if (option) {
      fireEvent.click(option);
      expect(button).toHaveTextContent('Item 2');
      expect(input).toBeTruthy();
    }

    await act(async () => {
      rerender(TestDropdown({ ...controlledDropdownProps, value: 'item-1' }));
    });
    const button2 = await findByRole('button');
    const input2 = await findByDisplayValue('item-1');
    expect(button2).toHaveTextContent('Item 1');
    expect(input2).toBeTruthy();
  });

  it('should match snapshot', async () => {
    const promise = Promise.resolve();
    const { container } = render(ControlledDropdown);
    expect(container).toMatchSnapshot();
    await act(() => promise);
  });
});

describe('Dropdown with additional aria-label', () => {
  const additionalLabelProps: DropdownProps = {
    ...dropdownProps,
    'aria-labelledby': 'additional-label-id',
  };
  const DropdownWithExtraLabel = TestDropdown(additionalLabelProps);

  it('should have aria-labelledby composed from label-id and provided aria-labelledby prop', async () => {
    const { findByRole } = render(DropdownWithExtraLabel);
    const button = await findByRole('button');
    expect(button.getAttribute('aria-labelledby')).toContain(
      'additional-label-id test-id-label',
    );
  });

  it('should match snapshot', async () => {
    const promise = Promise.resolve();
    const { container } = render(DropdownWithExtraLabel);
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
