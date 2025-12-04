/* eslint-disable no-promise-executor-return */
import React from 'react';
import { render, act, fireEvent, waitFor } from '@testing-library/react';

import { Dropdown, DropdownProps } from './Dropdown';
import { DropdownItem } from '../DropdownItem/DropdownItem';
import { axeTest } from '../../../../utils/test';

export async function waitForPosition() {
  await act(() => new Promise((r) => requestAnimationFrame(() => r(null))));
  await act(() => new Promise((r) => requestAnimationFrame(() => r(null))));
}

const dropdownProps = {
  labelText: 'Dropdown test',
  name: 'dropdown-test',
  className: 'dropdown-test',
  visualPlaceholder: 'Dropdown',
  id: 'test-id',
};

const TestDropdown = (props: DropdownProps) => (
  <Dropdown {...props}>
    <DropdownItem value={'item-1'}>Item 1</DropdownItem>
    <DropdownItem value={'item-2'}>Item 2</DropdownItem>
  </Dropdown>
);

const TestNestedDropdown = (props: DropdownProps) => (
  <Dropdown {...props}>
    {[1, 2, 3].map((item) => (
      <DropdownItem
        value={`dropdown-item-${item}`}
        disabled={item === 3}
        key={item}
        data-testid="pena"
      >
        {`Dropdown Item ${item}`}
      </DropdownItem>
    ))}
    <DropdownItem value="All">All</DropdownItem>
  </Dropdown>
);

describe('Basic dropdown', () => {
  const BasicDropdown = TestDropdown(dropdownProps);

  it('should have provided ids', async () => {
    const { baseElement } = render(BasicDropdown);
    const dropdown = baseElement.querySelector('.fi-dropdown');
    const label = dropdown?.getElementsByTagName('label')[0];
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
    expect(outerSpan).toHaveClass('fi-dropdown--disabled');
  });

  it('should match snapshot', async () => {
    const { baseElement, getByRole } = render(BasicDropdown);
    await waitForPosition();
    const menuButton = getByRole('button') as HTMLButtonElement;
    await act(async () => {
      fireEvent.click(menuButton);
    });
    await waitForPosition();
    expect(baseElement).toMatchSnapshot();
  });
});

describe('Dropdown with hidden label', () => {
  const hiddenProps: DropdownProps = {
    ...dropdownProps,
    labelMode: 'hidden',
  };
  const DropdownWithHiddenLabel = TestDropdown(hiddenProps);

  it('should have hidden label', async () => {
    const { findByText } = render(DropdownWithHiddenLabel);
    const label = await findByText('Dropdown test');
    expect(label).toHaveClass('fi-visually-hidden');
  });

  it('should match snapshot', async () => {
    const { baseElement } = render(DropdownWithHiddenLabel);
    expect(baseElement).toMatchSnapshot();
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
    const { baseElement, getByRole } = render(ControlledDropdown);
    await waitForPosition();
    const button = getByRole('button') as HTMLButtonElement;
    await act(async () => {
      fireEvent.click(button);
    });
    await waitForPosition();
    expect(baseElement).toMatchSnapshot();
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
    const { baseElement, getByRole, queryByRole } = render(
      DropdownWithExtraLabel,
    );
    await waitForPosition();
    const menuButton = await waitFor(
      () => getByRole('button') as HTMLButtonElement,
    );
    await act(async () => {
      fireEvent.click(menuButton);
    });
    await waitFor(() => queryByRole('listbox'));
    await waitForPosition();
    expect(baseElement).toMatchSnapshot();
  });
});

describe('Children', () => {
  it('should select nested item when item is clicked', async () => {
    const NestedDropdown = TestNestedDropdown({
      labelText: 'Dropdown',
    });
    const { getByRole, getAllByRole } = render(NestedDropdown);
    await waitForPosition();
    const menuButton = getByRole('button') as HTMLButtonElement;
    await act(async () => {
      fireEvent.click(menuButton);
    });
    const option = await waitFor(() => getAllByRole('option')[0]);
    await act(async () => {
      fireEvent.click(option);
    });
    expect(menuButton).toHaveTextContent('Dropdown Item 1');
  });

  it('should not select disabled nested item when item is clicked', async () => {
    const NestedDropdown = TestNestedDropdown({
      labelText: 'Dropdown',
      visualPlaceholder: 'Select',
    });
    const { getByRole, getAllByRole } = render(NestedDropdown);
    await waitForPosition();
    const menuButton = getByRole('button') as HTMLButtonElement;
    await act(async () => {
      fireEvent.click(menuButton);
    });
    const option = await waitFor(() => getAllByRole('option')[2]);
    await act(async () => {
      fireEvent.click(option);
    });
    expect(menuButton).toHaveTextContent('Select');
  });

  it('should select item when item is clicked', async () => {
    const NestedDropdown = TestNestedDropdown({ labelText: 'Dropdown' });
    const { getByRole, getAllByRole } = render(NestedDropdown);
    await waitForPosition();
    const menuButton = getByRole('button') as HTMLButtonElement;
    await act(async () => {
      fireEvent.click(menuButton);
    });
    const option = await waitFor(() => getAllByRole('option')[3]);
    await act(async () => {
      fireEvent.click(option);
    });
    expect(menuButton).toHaveTextContent('All');
  });
});

describe('DropdownItem', () => {
  it('should be selected when item is clicked', async () => {
    const BasicDropdown = TestDropdown({ labelText: 'Dropdown' });
    const { getByRole, getAllByRole } = render(BasicDropdown);
    await waitForPosition();
    const menuButton = getByRole('button') as HTMLButtonElement;
    await act(async () => {
      fireEvent.click(menuButton);
    });
    const option = await waitFor(() => getAllByRole('option')[0]);
    await act(async () => {
      fireEvent.click(option);
    });
    expect(menuButton).toHaveTextContent('Item 1');
  });

  it('should not be selected when disabled', async () => {
    const BasicDropdown = (
      <Dropdown labelText="Dropdown" visualPlaceholder="Select value">
        <DropdownItem value={'item-1'} disabled>
          Item 1
        </DropdownItem>
        <DropdownItem value={'item-2'}>Item 2</DropdownItem>
      </Dropdown>
    );
    const { getByRole, getAllByRole } = render(BasicDropdown);
    await waitForPosition();
    const menuButton = await waitFor(
      () => getByRole('button') as HTMLButtonElement,
    );
    await act(async () => {
      fireEvent.click(menuButton);
    });
    const option = await waitFor(() => getAllByRole('option')[0]);
    await act(async () => {
      fireEvent.click(option);
    });
    expect(menuButton).toHaveTextContent('Select value');
  });
});

describe('statusText', () => {
  it('has status text defined by prop', async () => {
    const statusTextProps: DropdownProps = {
      ...dropdownProps,
      statusText: 'Test status',
    };
    const DropdownWithStatusText = TestDropdown(statusTextProps);
    const { getByText } = render(DropdownWithStatusText);
    expect(getByText('Test status')).toBeDefined();
  });
});

describe('statusTextAriaLiveMode', () => {
  it('has assertive aria-live by default', async () => {
    const statusTextProps: DropdownProps = {
      ...dropdownProps,
      statusText: 'Test status',
    };
    const DropdownWithStatusText = TestDropdown(statusTextProps);
    const { getByText } = render(DropdownWithStatusText);
    expect(getByText('Test status')).toHaveAttribute('aria-live', 'assertive');
  });
  it('has aria-live defined by prop', async () => {
    const statusTextProps: DropdownProps = {
      ...dropdownProps,
      statusText: 'Test status',
      statusTextAriaLiveMode: 'off',
    };
    const DropdownWithStatusTextAriaLiveDisabled =
      TestDropdown(statusTextProps);
    const { getByText } = render(DropdownWithStatusTextAriaLiveDisabled);
    expect(getByText('Test status')).toHaveAttribute('aria-live', 'off');
  });
});

describe('hintText', () => {
  it('has hint text', async () => {
    const hintTextProps: DropdownProps = {
      ...dropdownProps,
      hintText: 'Test hint text',
    };
    const DropdownWithHintText = TestDropdown(hintTextProps);
    const { getByText } = render(DropdownWithHintText);
    const span = getByText('Test hint text');
    expect(span).toBeDefined();
  });
});

describe('margin', () => {
  it('should have margin style from margin prop', async () => {
    const props: DropdownProps = {
      ...dropdownProps,
      margin: 'xs',
    };
    const { baseElement } = render(TestDropdown(props));
    const div = baseElement.querySelector('.fi-dropdown');
    expect(div).toHaveStyle('margin: 10px');
  });

  it('should have margin style overwritten by style prop', async () => {
    const props: DropdownProps = {
      ...dropdownProps,
      margin: 'xs',
      style: {
        margin: 2,
      },
    };
    const { baseElement } = render(
      <Dropdown {...props}>
        <DropdownItem value={'item-1'}>Item 1</DropdownItem>
        <DropdownItem value={'item-2'}>Item 2</DropdownItem>
      </Dropdown>,
    );
    const div = baseElement.querySelector('.fi-dropdown');
    expect(div).toHaveAttribute('style', 'margin: 2px;');
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
