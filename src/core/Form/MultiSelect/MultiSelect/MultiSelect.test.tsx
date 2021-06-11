import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { axeTest } from '../../../../utils/test/axe';
import { MultiSelect } from './MultiSelect';

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

const defaultSelectedTools = [
  {
    name: 'Hammer',
    price: 15,
    tax: true,
    labelText: 'Hammer',
    uniqueItemId: 'h9823523',
  },
  {
    name: 'Powersaw',
    price: 150,
    tax: false,
    labelText: 'Powersaw',
    disabled: true,
    uniqueItemId: 'ps9081231',
  },
];

const BasicCombobox = (
  <MultiSelect
    labelText="MultiSelect"
    items={tools}
    chipListVisible={true}
    ariaChipActionLabel="Remove"
    removeAllButtonLabel="Remove all selections"
    visualPlaceholder="Choose your tool(s)"
    noItemsText="No items"
    defaultSelectedItems={defaultSelectedTools}
    ariaSelectedAmountText="tools selected"
  />
);

it('should not have basic accessibility issues', async () => {
  await act(async () => {
    axeTest(BasicCombobox);
  });
});

it('has matching snapshot', () => {
  const { container } = render(BasicCombobox);
  expect(container.firstChild).toMatchSnapshot();
});

describe('Chips', () => {
  it('should have selected Chips shown', async () => {
    await act(async () => {
      const { container } = render(BasicCombobox);
      expect(container.querySelectorAll('.fi-chip').length).toEqual(2);
    });
  });

  it('second Chip should be removable and removed when clicked', async () => {
    await act(async () => {
      const { getByText } = render(BasicCombobox);
      const hammerChip = getByText('Hammer');
      expect(hammerChip.classList).toContain('fi-chip--content');
      await act(async () => {
        fireEvent.click(hammerChip, {});
      });

      // Popover is open, therefore we are finding item
      const hammerLi = getByText('Hammer');
      expect(hammerLi.classList).toContain('fi-multiselect-item');
    });
  });

  test('onItemSelect: called with uniqueItem id, when clicking non-disabled Chip', async () => {
    await act(async () => {
      const onItemSelect = (uniqueItemId: string) => console.log(uniqueItemId);
      const onItemSelectSpy = jest.spyOn(console, 'log');
      const { container } = render(
        <MultiSelect
          labelText="MultiSelect"
          items={tools}
          chipListVisible={true}
          ariaChipActionLabel="Remove"
          removeAllButtonLabel="Remove all selections"
          visualPlaceholder="Choose your tool(s)"
          noItemsText="No items"
          defaultSelectedItems={defaultSelectedTools}
          onItemSelect={onItemSelect}
          ariaSelectedAmountText="tools selected"
        />,
      );
      const hammerChip = container.querySelectorAll('.fi-chip')[1];
      await act(async () => {
        fireEvent.click(hammerChip, {});
      });
      expect(onItemSelectSpy).toBeCalledWith('h9823523');
    });
  });

  it('first Chip should be aria-disabled', () => {
    const { container } = render(BasicCombobox);
    const disabledChip = container.querySelectorAll('.fi-chip')[0];
    expect(disabledChip).toHaveTextContent('Powersaw');
    expect(disabledChip).toHaveClass('fi-chip--disabled');
    expect(disabledChip).toHaveAttribute('aria-disabled');
  });

  it('should remove all non-disabled Chips when pressing "Remove all" button', async () => {
    await act(async () => {
      const { container } = render(BasicCombobox);
      expect(container.querySelectorAll('.fi-chip').length).toEqual(2);
      const removeAllButton = container.querySelectorAll(
        '.fi-multiselect_removeAllButton',
      )[0];
      await act(async () => {
        fireEvent.click(removeAllButton, {});
      });
      const chips = container.querySelectorAll('.fi-chip');
      expect(chips.length).toEqual(1);
    });
  });

  test('onRemoveAll: should be called when pressing "Remove all" button', async () => {
    await act(async () => {
      const mockOnRemoveAll = jest.fn();
      const { container } = render(
        <MultiSelect
          labelText="MultiSelect"
          items={tools}
          chipListVisible={true}
          ariaChipActionLabel="Remove"
          removeAllButtonLabel="Remove all selections"
          visualPlaceholder="Choose your tool(s)"
          noItemsText="No items"
          defaultSelectedItems={defaultSelectedTools}
          onRemoveAll={mockOnRemoveAll}
          ariaSelectedAmountText="tools selected"
        />,
      );
      const removeAllButton = container.querySelectorAll(
        '.fi-multiselect_removeAllButton',
      )[0];
      await act(async () => {
        fireEvent.click(removeAllButton, {});
      });
      expect(mockOnRemoveAll).toBeCalledTimes(1);
    });
  });
});

describe('Controlled', () => {
  it('has the controlled items as selected + disabled', async () => {
    const controlledItems = [
      {
        name: 'Shovel',
        price: 115,
        tax: true,
        labelText: 'Shovel',
        uniqueItemId: 's05111511',
        disabled: true,
      },
      {
        name: 'Sledgehammer',
        price: 36,
        tax: false,
        labelText: 'Sledgehammer',
        uniqueItemId: 'sh908293482',
      },
    ];
    const multiselect = (
      <MultiSelect
        selectedItems={controlledItems}
        labelText="MultiSelect"
        items={tools}
        chipListVisible={true}
        ariaChipActionLabel="Remove"
        removeAllButtonLabel="Remove all selections"
        visualPlaceholder="Choose your tool(s)"
        noItemsText="No items"
        defaultSelectedItems={defaultSelectedTools}
        ariaSelectedAmountText="tools selected"
      />
    );

    await act(async () => {
      const { container } = render(multiselect);
      expect(container.querySelectorAll('.fi-chip').length).toEqual(2);

      const chips = container.querySelectorAll('.fi-chip');

      const disabledChip = chips[0];
      expect(disabledChip).toHaveTextContent('Shovel');
      expect(disabledChip).toHaveClass('fi-chip--disabled');
      expect(disabledChip).toHaveAttribute('aria-disabled');

      const otherChip = chips[1];
      expect(otherChip).toHaveTextContent('Sledgehammer');
    });
  });

  it('does not allow removing of items by clicking', async () => {
    const animals = [
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
        price: 5,
        labelText: 'Turtle',
        uniqueItemId: 'turtle-987',
      },
    ];

    const multiselect = (
      <MultiSelect
        items={animals}
        selectedItems={[
          { price: 5, labelText: 'Turtle', uniqueItemId: 'turtle-987' },
        ]}
        labelText="Animals"
        noItemsText="No animals"
        chipListVisible={true}
        visualPlaceholder="Try to choose animal(s)"
        ariaChipActionLabel="Remove"
        ariaSelectedAmountText="tools selected"
      />
    );

    const { getByText, getAllByText } = render(multiselect);
    const turtleChip = getByText('Turtle');
    await act(async () => {
      fireEvent.click(turtleChip, {});
    });
    // Popover is open, so therefore two
    expect(getAllByText('Turtle').length).toBe(2);
  });
});

it('should have correct baseClassName', async () => {
  await act(async () => {
    const { container } = render(BasicCombobox);
    expect(container.firstChild).toHaveClass('fi-multiselect');
  });
});

test('className: has given custom classname', async () => {
  await act(async () => {
    const { container } = render(
      <MultiSelect
        labelText="MultiSelect"
        items={[]}
        noItemsText="No items"
        className="custom-class"
        ariaSelectedAmountText=""
      />,
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});

test('labelText: has the given text as label', async () => {
  await act(async () => {
    const { queryByText } = render(
      <MultiSelect
        labelText="MultiSelect"
        items={[]}
        noItemsText="No items"
        ariaSelectedAmountText=""
      />,
    );
    expect(queryByText('MultiSelect')).not.toBeNull();
  });
});

test('visualPlaceholder: has the given text as placeholder attribute', () => {
  const { getByRole } = render(
    <MultiSelect
      labelText="MultiSelect"
      items={[]}
      noItemsText="No items"
      visualPlaceholder="Select item(s)"
      ariaSelectedAmountText=""
    />,
  );
  const inputfield = getByRole('textbox') as HTMLInputElement;
  expect(inputfield).toHaveAttribute('placeholder', 'Select item(s)');
});

test('id: has the given id', () => {
  const { getByRole } = render(
    <MultiSelect
      id="cb-123"
      labelText="MultiSelect"
      items={[]}
      noItemsText="No items"
      ariaSelectedAmountText=""
    />,
  );
  expect(getByRole('textbox')).toHaveAttribute('id', 'cb-123');
});

describe('statusText', () => {
  it('should have element and correct classname for it', () => {
    const { getByText } = render(
      <MultiSelect
        id="123"
        labelText="MultiSelect"
        items={[]}
        noItemsText="No items"
        visualPlaceholder="Select item(s)"
        statusText="EROR EROR"
        ariaSelectedAmountText=""
      />,
    );
    const statusText = getByText('EROR EROR');
    expect(statusText).toHaveClass('fi-status-text');
  });

  it('will be added to input aria-describedby', () => {
    const { getByRole } = render(
      <MultiSelect
        id="123"
        labelText="MultiSelect"
        items={[]}
        noItemsText="No items"
        visualPlaceholder="Select item(s)"
        statusText="EROR EROR"
        ariaSelectedAmountText=""
      />,
    );
    expect(getByRole('textbox')).toHaveAttribute(
      'aria-describedby',
      '123-statusText 123-selectedItems-length',
    );
  });
});

describe('status', () => {
  it('should have error classname', () => {
    const { container } = render(
      <MultiSelect
        id="123"
        labelText="MultiSelect"
        items={[]}
        noItemsText="No items"
        visualPlaceholder="Select item(s)"
        status="error"
        ariaSelectedAmountText=""
      />,
    );
    expect(container.firstChild).toHaveClass('fi-multiselect--error');
  });
});
