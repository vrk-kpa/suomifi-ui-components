import React from 'react';
import { render, act, fireEvent, waitFor } from '@testing-library/react';
import { axeTest } from '../../../../utils/test/axe';
import { SingleSelect, SingleSelectData } from './SingleSelect';

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
  const { baseElement, getByRole } = render(BasicSingleSelect);
  const textfield = getByRole('textbox') as HTMLInputElement;
  await act(async () => {
    fireEvent.focus(textfield);
  });
  expect(baseElement).toMatchSnapshot();
});

describe('Controlled', () => {
  it('has the controlled items as selected', async () => {
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

    await act(async () => {
      const { getByRole, getByText, rerender } = render(singleSelect);
      expect(getByRole('textbox')).toHaveValue('Powersaw');
      const input = getByRole('textbox');
      await act(async () => {
        fireEvent.click(input);
      });
      const item = await waitFor(() => getByText('Powersaw'));
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
  });

  it('does not allow removing of items by clicking', async () => {
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
    await act(async () => {
      fireEvent.click(clearButton, {});
    });
    expect(getByRole('textbox')).toHaveValue('Turtle');
  });
});

it('should have correct baseClassName', async () => {
  await act(async () => {
    const { container } = render(BasicSingleSelect);
    expect(container.firstChild).toHaveClass('fi-single-select');
  });
});

test('className: has given custom classname', async () => {
  await act(async () => {
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
});

describe('filter', () => {
  it('should be available with default selection', async () => {
    const { getByRole, getAllByRole } = render(BasicSingleSelect);
    const input = getByRole('textbox');
    expect(input).toHaveValue('Hammer');
    fireEvent.change(input, { target: { value: 'h' } });
    expect(input).toHaveValue('h');
    const items = await waitFor(() => getAllByRole('option'));
    expect(items).toHaveLength(4);
  });

  it('should be available when nothing is selected', async () => {
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
    fireEvent.change(input, { target: { value: 'h' } });
    expect(input).toHaveValue('h');
    const items = await waitFor(() => getAllByRole('option'));
    expect(items).toHaveLength(4);
  });

  it('should be removed onBlur', async () => {
    const { getByRole, getAllByRole } = render(BasicSingleSelect);
    const input = getByRole('textbox');
    expect(input).toHaveValue('Hammer');
    fireEvent.change(input, { target: { value: 'h' } });
    expect(input).toHaveValue('h');
    await act(async () => {
      fireEvent.blur(input);
    });
    await waitFor(() => {
      expect(input).toHaveValue('Hammer');
    });
    fireEvent.focus(input);
    const options = await waitFor(() => getAllByRole('option'));
    expect(options).toHaveLength(9);
  });
});

test('option: should be selected when clicked', async () => {
  await act(async () => {
    const { getByText, getByRole } = render(BasicSingleSelect);
    const input = getByRole('textbox');
    await act(async () => {
      fireEvent.click(input);
    });

    const option = await waitFor(() => getByText('Rake'));
    await act(async () => {
      fireEvent.click(option);
    });
    expect(input).toHaveValue('Rake');
  });
});

test('labelText: has the given text as label', async () => {
  await act(async () => {
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
});

test('visualPlaceholder: has the given text as placeholder attribute', () => {
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

test('id: has the given id', () => {
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
  it('should have element and correct classname for it', () => {
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

  it('will be added to input aria-describedby', () => {
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
  it('should have error classname', () => {
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

describe('disabled', () => {
  it('should not be interactive while disabled', async () => {
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
    await act(async () => {
      fireEvent.click(input);
    });
    expect(() => getAllByRole('option')).toThrowError();
  });
});

describe('custom item addition mode', () => {
  it('should allow user to add & remove their own option as the selected value', async () => {
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
    await act(async () => {
      fireEvent.change(input, { target: { value: 'hamm' } });
    });

    const items = await waitFor(() => getAllByRole('option'));
    expect(items).toHaveLength(4);
    const extraItem = items.find((item) => item.textContent === 'hamm');

    if (extraItem) {
      await act(async () => {
        fireEvent.click(extraItem);
      });
      await act(async () => {
        fireEvent.blur(input);
      });
      await act(async () => {
        fireEvent.focus(input);
      });
      const appendedItems = await waitFor(() => getAllByRole('option'));
      expect(appendedItems).toHaveLength(10);
      const lastItem = appendedItems[9];
      expect(lastItem).toHaveTextContent('hamm');
      expect(lastItem).toHaveClass('fi-select-item--selected');

      const clearButton = getByText('Clear selection');
      await act(async () => {
        fireEvent.click(clearButton);
      });
      expect(input).toHaveValue('');

      await act(async () => {
        fireEvent.click(input);
      });
      const resetItems = await waitFor(() => getAllByRole('option'));
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
    await act(async () => {
      fireEvent.change(input, { target: { value: 'M' } });
    });
    const ariaText = getByText(`2 Options available`);
    expect(ariaText).toBeInTheDocument();
  });

  it('should include text from ariaOptionsAvailableTextFunction', async () => {
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
    await act(async () => {
      fireEvent.change(input, { target: { value: 'V' } });
    });
    const ariaText = getByText(`There is 1 option available`);
    expect(ariaText).toBeInTheDocument();
    await act(async () => {
      fireEvent.change(input, { target: { value: 'M' } });
    });
    expect(ariaText).toHaveTextContent('There are 2 options available');
  });
});

describe('forward ref', () => {
  it('ref is forwarded to input', () => {
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
