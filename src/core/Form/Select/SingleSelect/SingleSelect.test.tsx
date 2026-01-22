import React from 'react';
import { render, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { axeTest } from '../../../../utils/test/axe';
import { SingleSelect, SingleSelectData } from './SingleSelect';

export async function waitForPosition() {
  await act(
    () =>
      new Promise((r) => {
        requestAnimationFrame(() => r(null));
      }),
  );
  await act(
    () =>
      new Promise((r) => {
        requestAnimationFrame(() => r(null));
      }),
  );
}

const tools = [
  {
    name: 'Jackhammer',
    price: 230,
    tax: false,
    labelText: 'Jackhammer',
    uniqueItemId: 'jh2435626',
  },
  {
    name: 'Hammer',
    price: 15,
    tax: true,
    labelText: 'Hammer',
    uniqueItemId: 'h9823523',
  },
  {
    name: 'Sledgehammer',
    price: 36,
    tax: false,
    labelText: 'Sledgehammer',
    uniqueItemId: 'sh908293482',
  },
  {
    name: 'Spade',
    price: 50,
    tax: true,
    labelText: 'Spade',
    uniqueItemId: 's82502335',
  },
  {
    name: 'Powersaw',
    price: 150,
    tax: false,
    labelText: 'Powersaw',
    disabled: true,
    uniqueItemId: 'ps9081231',
  },
  {
    name: 'Shovel',
    price: 115,
    tax: true,
    labelText: 'Shovel',
    uniqueItemId: 's05111511',
  },
  {
    name: 'Iron stick',
    price: 85,
    tax: false,
    labelText: 'Iron stick',
    uniqueItemId: 'is3451261',
  },
  {
    name: 'Rake',
    price: 50,
    tax: true,
    labelText: 'Rake',
    uniqueItemId: 'r09282626',
  },
  {
    name: 'Motorsaw',
    price: 450,
    tax: false,
    labelText: 'Motorsaw',
    disabled: true,
    uniqueItemId: 'ms6126266',
  },
];

const defaultSelectedTool = {
  name: 'Hammer',
  price: 15,
  tax: true,
  labelText: 'Hammer',
  uniqueItemId: 'h9823523',
};

const BasicSingleSelect = (
  <SingleSelect
    labelText="SingleSelect"
    hintText="You can filter options by typing in the field"
    clearButtonLabel="Clear selection"
    items={tools}
    visualPlaceholder="Choose your tool(s)"
    noItemsText="No items"
    defaultSelectedItem={defaultSelectedTool}
    ariaOptionsAvailableText="Options available"
  />
);

it('should not have basic accessibility issues', async () => {
  await act(async () => {
    axeTest(BasicSingleSelect);
  });
});

it('has matching snapshot', async () => {
  const user = userEvent.setup();
  const { baseElement, getByRole } = render(BasicSingleSelect);
  const textfield = getByRole('textbox') as HTMLInputElement;
  await user.click(textfield);
  await waitForPosition();
  expect(baseElement).toMatchSnapshot();
});

describe('Controlled', () => {
  it('has the controlled items as selected', async () => {
    const user = userEvent.setup();
    const controlledItem: {
      name: string;
      price: number;
      tax: boolean;
    } & SingleSelectData = {
      name: 'Powersaw',
      price: 150,
      tax: false,
      labelText: 'Powersaw',
      disabled: true,
      uniqueItemId: 'ps9081231',
    };
    const singleSelect = (
      <SingleSelect
        selectedItem={controlledItem}
        labelText="SingleSelect"
        clearButtonLabel="Clear selection"
        items={tools}
        visualPlaceholder="Choose your tool"
        noItemsText="No items"
        defaultSelectedItem={defaultSelectedTool}
        ariaOptionsAvailableText="Options available"
      />
    );

    const { getByRole, getByText, rerender } = render(singleSelect);
    expect(getByRole('textbox')).toHaveValue('Powersaw');
    const input = getByRole('textbox');
    await user.click(input);
    await waitForPosition();
    const item = getByText('Powersaw');
    expect(item).toHaveAttribute('aria-disabled');
    expect(item).toHaveClass('fi-select-item--disabled');

    rerender(
      <SingleSelect
        selectedItem={null}
        labelText="SingleSelect"
        clearButtonLabel="Clear selection"
        items={tools}
        visualPlaceholder="Choose your tool"
        noItemsText="No items"
        defaultSelectedItem={defaultSelectedTool}
        ariaOptionsAvailableText="Options available"
      />,
    );
    const rerenderedInput = getByRole('textbox');
    expect(rerenderedInput).toHaveValue('');
  });

  it('does not allow removing of items by clicking', async () => {
    const user = userEvent.setup();
    type AnimalData = SingleSelectData & { age: number };
    const animals: AnimalData[] = [
      {
        age: 2,
        labelText: 'Rabbit',
        uniqueItemId: 'rabbit-123',
      },
      {
        age: 1,
        labelText: 'Snail',
        uniqueItemId: 'snail-321',
      },
      {
        age: 5,
        labelText: 'Turtle',
        uniqueItemId: 'turtle-987',
      },
    ];

    const singleSelect = (
      <SingleSelect<AnimalData>
        items={animals}
        clearButtonLabel="Clear selection"
        selectedItem={{
          age: 5,
          labelText: 'Turtle',
          uniqueItemId: 'turtle-987',
        }}
        labelText="Animals"
        noItemsText="No items"
        visualPlaceholder="Try to choose animal(s)"
        ariaOptionsAvailableText="Options available"
      />
    );

    const { getByText, getByRole } = render(singleSelect);
    const clearButton = getByText('Clear selection');
    await user.click(clearButton);
    expect(getByRole('textbox')).toHaveValue('Turtle');
  });
});

it('should have correct baseClassName', async () => {
  const { container } = render(BasicSingleSelect);
  expect(container.firstChild).toHaveClass('fi-single-select');
});

test('className: has given custom classname', async () => {
  const { container } = render(
    <SingleSelect
      labelText="SingleSelect"
      clearButtonLabel="Clear selection"
      items={[]}
      noItemsText="No items"
      className="custom-class"
      ariaOptionsAvailableText="Options available"
    />,
  );
  expect(container.firstChild).toHaveClass('custom-class');
});

describe('filter', () => {
  it('should be available with default selection', async () => {
    const user = userEvent.setup();
    const { getByRole, getAllByRole } = render(BasicSingleSelect);
    const input = getByRole('textbox');
    expect(input).toHaveValue('Hammer');
    await user.clear(input);
    await user.type(input, 'h');
    await waitForPosition();
    const items = getAllByRole('option');
    expect(items).toHaveLength(4);
  });

  it('should be available when nothing is selected', async () => {
    const user = userEvent.setup();
    const { getByRole, getAllByRole } = render(
      <SingleSelect
        labelText="SingleSelect"
        clearButtonLabel="Clear selection"
        items={tools}
        visualPlaceholder="Choose your tool(s)"
        noItemsText="No items"
        ariaOptionsAvailableText="Options available"
      />,
    );
    const input = getByRole('textbox');
    await user.type(input, 'h');
    await waitForPosition();
    const items = getAllByRole('option');
    expect(items).toHaveLength(4);
  });

  it('should be removed onBlur', async () => {
    const user = userEvent.setup();
    const { getByRole, getAllByRole } = render(BasicSingleSelect);
    const input = getByRole('textbox');
    expect(input).toHaveValue('Hammer');
    await user.clear(input);
    await user.type(input, 'h');
    await waitForPosition();
    expect(input).toHaveValue('h');
    await user.tab();
    await waitFor(() => {
      expect(input).toHaveValue('Hammer');
    });
    await user.click(input);
    await waitForPosition();
    const options = getAllByRole('option');
    expect(options).toHaveLength(9);
  });
});

test('option: should be selected when clicked', async () => {
  const user = userEvent.setup();
  const { getByText, getByRole } = render(BasicSingleSelect);
  const input = getByRole('textbox');
  await user.click(input);
  await waitForPosition();
  const option = getByText('Rake');

  await user.click(option);

  expect(input).toHaveValue('Rake');
});

test('labelText: has the given text as label', async () => {
  const { queryByText } = render(
    <SingleSelect
      labelText="SingleSelect"
      clearButtonLabel="Clear selection"
      items={[]}
      noItemsText="No items"
      ariaOptionsAvailableText="Options available"
    />,
  );
  expect(queryByText('SingleSelect')).not.toBeNull();
});

test('visualPlaceholder: has the given text as placeholder attribute', async () => {
  const { getByRole } = render(
    <SingleSelect
      labelText="SingleSelect"
      clearButtonLabel="Clear selection"
      items={[]}
      noItemsText="No items"
      visualPlaceholder="Select item"
      ariaOptionsAvailableText="Options available"
    />,
  );
  const inputfield = getByRole('textbox') as HTMLInputElement;
  expect(inputfield).toHaveAttribute('placeholder', 'Select item');
});

test('id: has the given id', async () => {
  const { getByRole } = render(
    <SingleSelect
      id="cb-123"
      labelText="SingleSelect"
      clearButtonLabel="Clear selection"
      items={[]}
      noItemsText="No items"
      ariaOptionsAvailableText="Options available"
    />,
  );
  expect(getByRole('textbox')).toHaveAttribute('id', 'cb-123');
});

describe('statusText', () => {
  it('should have element and correct classname for it', async () => {
    const { getByText } = render(
      <SingleSelect
        id="123"
        labelText="SingleSelect"
        clearButtonLabel="Clear selection"
        items={[]}
        noItemsText="No items"
        visualPlaceholder="Select item"
        statusText="EROR EROR"
        ariaOptionsAvailableText="Options available"
      />,
    );
    const statusText = getByText('EROR EROR');
    expect(statusText).toHaveClass('fi-status-text');
  });

  it('will be added to input aria-describedby', async () => {
    const { getByRole } = render(
      <SingleSelect
        id="123"
        labelText="SingleSelect"
        clearButtonLabel="Clear selection"
        items={[]}
        noItemsText="No items"
        visualPlaceholder="Select item"
        statusText="EROR EROR"
        ariaOptionsAvailableText="Options available"
      />,
    );
    expect(getByRole('textbox')).toHaveAttribute(
      'aria-describedby',
      '123-statusText',
    );
  });
});

describe('status', () => {
  it('should have error classname', async () => {
    const { container } = render(
      <SingleSelect
        id="123"
        labelText="SingleSelect"
        clearButtonLabel="Clear selection"
        items={[]}
        noItemsText="No items"
        visualPlaceholder="Select item"
        status="error"
        ariaOptionsAvailableText="Options available"
      />,
    );
    expect(container.firstChild).toHaveClass('fi-single-select--error');
  });
});

describe('fullWidth', () => {
  it('should have full width classname', async () => {
    const { container } = render(
      <SingleSelect
        labelText="SingleSelect"
        clearButtonLabel="Clear selection"
        items={[]}
        noItemsText="No items"
        visualPlaceholder="Select item"
        fullWidth={true}
        ariaOptionsAvailableText="Options available"
      />,
    );
    expect(container.firstChild).toHaveClass('fi-single-select--full-width');
    expect(container.firstChild).toHaveStyle('width: 100%;');
  });
});

describe('disabled', () => {
  it('should not be interactive while disabled', async () => {
    const user = userEvent.setup();
    const { getByRole, getAllByRole } = render(
      <SingleSelect
        disabled={true}
        labelText="Tools"
        clearButtonLabel="Clear selection"
        items={tools}
        noItemsText="No matching options"
        ariaOptionsAvailableText="Options available"
      />,
    );
    const input = getByRole('textbox');
    await user.click(input);
    expect(() => getAllByRole('option')).toThrowError();
  });
});

describe('custom item addition mode', () => {
  it('should allow user to add & remove their own option as the selected value', async () => {
    const user = userEvent.setup();
    const { getByRole, getAllByRole, getByText } = render(
      <SingleSelect
        allowItemAddition={true}
        itemAdditionHelpText="Add custom item"
        labelText="Tools"
        clearButtonLabel="Clear selection"
        items={tools}
        ariaOptionsAvailableText="Options available"
      />,
    );
    const input = getByRole('textbox');
    await user.type(input, 'hamm');
    await waitForPosition();
    const items = getAllByRole('option');
    expect(items).toHaveLength(4);
    const extraItem = items.find((item) => item.textContent === 'hamm');

    if (extraItem) {
      await user.click(extraItem);
      await user.tab();
      await user.click(input);
      await waitForPosition();
      const appendedItems = getAllByRole('option');
      expect(appendedItems).toHaveLength(10);
      const lastItem = appendedItems[9];
      expect(lastItem).toHaveTextContent('hamm');
      expect(lastItem).toHaveClass('fi-select-item--selected');

      const clearButton = getByText('Clear selection');
      await user.click(clearButton);
      expect(input).toHaveValue('');

      await user.click(input);
      await waitForPosition();
      const resetItems = getAllByRole('option');
      expect(resetItems).toHaveLength(9);
    } else {
      throw new Error('No custom item found');
    }
  });
});

describe('ariaOptionsAvailable', () => {
  const planets: SingleSelectData[] = [
    { labelText: 'Mercury', uniqueItemId: 'Me' },
    { labelText: 'Venus', uniqueItemId: 'Ve' },
    { labelText: 'Earth', uniqueItemId: 'Ea' },
    { labelText: 'Mars', uniqueItemId: 'Ma' },
  ];

  it('should include ariaOptionsAvailableText', async () => {
    const user = userEvent.setup();
    const { getByRole, getByText } = render(
      <SingleSelect
        labelText="SingleSelect"
        clearButtonLabel="Clear"
        items={planets}
        visualPlaceholder="Choose your planet"
        noItemsText="No items"
        ariaOptionsAvailableText="Options available"
      />,
    );
    const input = getByRole('textbox');
    await user.type(input, 'M');
    await waitForPosition();
    const ariaText = getByText(`2 Options available`);
    expect(ariaText).toBeInTheDocument();
  });

  it('should include text from ariaOptionsAvailableTextFunction', async () => {
    const user = userEvent.setup();
    const { getByRole, getByText } = render(
      <SingleSelect
        labelText="SingleSelect"
        clearButtonLabel="Clear"
        items={planets}
        visualPlaceholder="Choose your planet"
        noItemsText="No items"
        ariaOptionsAvailableTextFunction={(length) =>
          length === 1
            ? `There is ${length} option available`
            : `There are ${length} options available`
        }
      />,
    );
    const input = getByRole('textbox');
    await user.type(input, 'V');
    await waitForPosition();
    const ariaText = getByText(`There is 1 option available`);
    expect(ariaText).toBeInTheDocument();
    await user.clear(input);
    await user.type(input, 'M');
    await waitForPosition();
    expect(ariaText).toHaveTextContent('There are 2 options available');
  });
});

describe('forward ref', () => {
  it('ref is forwarded to input', async () => {
    const ref = React.createRef<HTMLInputElement>();

    render(
      <SingleSelect
        labelText="SingleSelect"
        clearButtonLabel="Clear selection"
        items={tools}
        defaultSelectedItem={defaultSelectedTool}
        noItemsText="No items"
        visualPlaceholder="Select item"
        ariaOptionsAvailableText="Options available"
        ref={ref}
      />,
    );

    expect(ref.current?.tagName).toBe('INPUT');
    expect(ref.current?.value).toBe('Hammer');
  });
});

describe('listProps', () => {
  it('adds data-test-id to unordered list element', async () => {
    const user = userEvent.setup();
    const { getByRole } = render(
      <SingleSelect
        labelText="Test"
        clearButtonLabel="Clear selection"
        items={tools}
        noItemsText="No items"
        ariaOptionsAvailableText="Options available"
        listProps={{
          'data-test-id': 'custom-data-attr',
        }}
      />,
    );
    const input = getByRole('textbox');
    await user.click(input);
    await waitForPosition();
    const menu = getByRole('listbox');
    expect(menu).toHaveAttribute('data-test-id', 'custom-data-attr');
  });
});

describe('listItemProps', () => {
  it('adds data-test-id to list item element', async () => {
    const user = userEvent.setup();
    const { getByRole } = render(
      <SingleSelect
        labelText="Test"
        clearButtonLabel="Clear selection"
        items={[
          {
            labelText: 'Abc',
            uniqueItemId: 'abc123',
            listItemProps: {
              'data-test-id': 'abc',
            },
          },
        ]}
        noItemsText="No items"
        ariaOptionsAvailableText="Options available"
      />,
    );
    const input = getByRole('textbox');
    await user.click(input);
    await waitForPosition();
    const option = getByRole('option');

    expect(option).toHaveAttribute('data-test-id', 'abc');
  });
});

describe('External update to item array', () => {
  const ModalWithSiblings = () => {
    const planets: SingleSelectData[] = [
      { labelText: 'Mercury', uniqueItemId: 'Me' },
      { labelText: 'Venus', uniqueItemId: 'Ve' },
      { labelText: 'Earth', uniqueItemId: 'Ea' },
      { labelText: 'Mars', uniqueItemId: 'Ma' },
    ];

    const [stateItems, setStateItems] = React.useState(planets);

    return (
      <div>
        <button
          data-testid="changeState"
          onClick={() => {
            const tempPlanets = [...stateItems];
            tempPlanets[0] = { labelText: 'Moon', uniqueItemId: 'Me' };
            setStateItems(tempPlanets);
          }}
        />

        <SingleSelect
          labelText="Test"
          clearButtonLabel="Clear selection"
          items={stateItems}
          defaultSelectedItem={stateItems[0]}
          noItemsText="No items"
          ariaOptionsAvailableText="Options available"
        />
      </div>
    );
  };

  it('updated item array should be visible in input', async () => {
    const user = userEvent.setup();
    const { getByRole, getByTestId } = render(<ModalWithSiblings />);
    const input = getByRole('textbox');
    expect(input).toHaveDisplayValue('Mercury');

    const button = getByTestId('changeState');
    await user.click(button);
    expect(input).toHaveDisplayValue('Moon');
  });
});

describe('margin', () => {
  it('should have margin style from margin prop', async () => {
    const { container } = render(
      <SingleSelect
        labelText=""
        clearButtonLabel=""
        items={[]}
        noItemsText=""
        ariaOptionsAvailableText=""
        margin="xs"
      />,
    );
    expect(container.firstChild).toHaveStyle('margin: 10px');
  });

  it('should have margin style overridden by style prop', async () => {
    const { container } = render(
      <SingleSelect
        labelText=""
        clearButtonLabel=""
        items={[]}
        noItemsText=""
        ariaOptionsAvailableText=""
        margin="xs"
        style={{ margin: 2 }}
      />,
    );
    expect(container.firstChild).toHaveAttribute('style', 'margin: 2px;');
  });
});

describe('keyboard interactions', () => {
  it('should reset input value to selected item when pressing Escape after typing', async () => {
    jest.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const { getByRole, getByText } = render(BasicSingleSelect);

    const input = getByRole('textbox');

    // First, select an item
    await user.click(input);
    const option = getByText('Rake');
    await user.click(option);
    expect(input).toHaveValue('Rake');

    await user.click(input);
    // Wait for the select timeout in the component to complete before typing
    act(() => jest.advanceTimersByTime(150));
    await user.type(input, 'something else');
    expect(input).toHaveValue('something else');

    // Press Escape - should reset to selected item
    await user.keyboard('{Escape}');
    expect(input).toHaveValue('Rake');
    jest.useRealTimers();
  });

  it('should clear input when pressing Escape with no selected item', async () => {
    const user = userEvent.setup();
    const { getByRole } = render(
      <SingleSelect
        labelText="SingleSelect"
        clearButtonLabel="Clear selection"
        items={tools}
        visualPlaceholder="Choose your tool"
        noItemsText="No items"
        ariaOptionsAvailableText="Options available"
      />,
    );
    await waitForPosition();

    const input = getByRole('textbox');

    // Type something in the input without selecting
    await user.click(input);
    await user.clear(input);
    await user.type(input, 'something');
    expect(input).toHaveValue('something');

    // Press Escape - should clear input since no item is selected
    await user.keyboard('{Escape}');
    expect(input).toHaveValue('');
  });
});
