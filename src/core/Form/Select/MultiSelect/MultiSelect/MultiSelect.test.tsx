/* eslint-disable no-promise-executor-return */
import React, { act } from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { axeTest } from '../../../../../utils/test';
import { MultiSelect, MultiSelectData } from './MultiSelect';

export async function waitForPosition() {
  await act(() => new Promise((r) => requestAnimationFrame(() => r(null))));
  await act(() => new Promise((r) => requestAnimationFrame(() => r(null))));
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
  {
    name: 'Rake',
    price: 50,
    tax: true,
    labelText: 'Rake',
    uniqueItemId: 'r09282626',
  },
];

const BasicMultiSelect = (
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
    ariaOptionsAvailableText="tools left"
    ariaOptionChipRemovedText="removed"
  />
);

it('should not have basic accessibility issues', async () => {
  axeTest(BasicMultiSelect);
});

it('has matching snapshot', async () => {
  const { baseElement, getByRole } = render(BasicMultiSelect);
  await waitForPosition();
  const textfield = getByRole('textbox') as HTMLInputElement;
  await act(async () => {
    fireEvent.focus(textfield);
  });

  await waitForPosition();
  await waitFor(() => {
    expect(baseElement).toMatchSnapshot();
  });
});

describe('Chips', () => {
  it('should have selected Chips shown', async () => {
    const { container } = render(BasicMultiSelect);
    await waitFor(() => {
      expect(container.querySelectorAll('.fi-chip')).toHaveLength(3);
    });
  });

  it('second Chip should be removable and removed when clicked', async () => {
    const { getByText, queryByText } = render(BasicMultiSelect);
    const hammerChip = getByText('Hammer');
    expect(queryByText('Hammer')).not.toBeNull();

    expect(hammerChip.classList).toContain('fi-chip--content');
    await act(async () => {
      fireEvent.click(hammerChip);
    });

    await waitFor(() => {
      const removedHammerChip = queryByText('Hammer');
      expect(removedHammerChip).toBeNull();
    });
  });

  test('onItemSelect: called with uniqueItem id, when clicking non-disabled Chip', async () => {
    const mockOnItemSelect = jest.fn();
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
        onItemSelect={mockOnItemSelect}
        ariaSelectedAmountText="tools selected"
        ariaOptionsAvailableText="tools left"
        ariaOptionChipRemovedText="removed"
      />,
    );
    const hammerChip = container.querySelectorAll('.fi-chip')[1];
    await act(async () => {
      fireEvent.click(hammerChip);
    });
    await waitFor(() => {
      expect(mockOnItemSelect).toBeCalledWith('h9823523');
    });
  });

  it('first Chip should be aria-disabled', () => {
    const { container } = render(BasicMultiSelect);
    const disabledChip = container.querySelectorAll('.fi-chip')[0];
    expect(disabledChip).toHaveTextContent('Powersaw');
    expect(disabledChip).toHaveClass('fi-chip--disabled');
    expect(disabledChip).toHaveAttribute('aria-disabled');
  });

  it('should remove all non-disabled Chips when pressing "Remove all" button', async () => {
    const { container } = render(BasicMultiSelect);
    expect(container.querySelectorAll('.fi-chip')).toHaveLength(3);
    const removeAllButton = container.querySelector(
      '.fi-multiselect_removeAllButton',
    );
    if (removeAllButton) {
      await act(async () => {
        fireEvent.click(removeAllButton);
      });
    }
    await waitFor(() => {
      const chips = container.querySelectorAll('.fi-chip');
      expect(chips).toHaveLength(1);
    });
  });

  test('onRemoveAll: should be called when pressing "Remove all" button', async () => {
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
        ariaOptionsAvailableText="tools left"
        ariaOptionChipRemovedText="removed"
      />,
    );
    const removeAllButton = container.querySelector(
      '.fi-multiselect_removeAllButton',
    );
    if (removeAllButton) {
      await act(async () => {
        fireEvent.click(removeAllButton);
      });
    }
    await waitFor(() => {
      expect(mockOnRemoveAll).toBeCalledTimes(1);
    });
  });
});

describe('Non-controlled', () => {
  it('has correct amount of items are shown on filtering and after selection', async () => {
    const { getByRole, findAllByRole, getByText } = render(
      <MultiSelect
        labelText="MultiSelect"
        items={tools}
        chipListVisible={false}
        ariaChipActionLabel="Remove"
        removeAllButtonLabel="Remove all selections"
        visualPlaceholder="Choose your tool(s)"
        noItemsText="No items"
        ariaSelectedAmountText="tools selected"
        ariaOptionsAvailableText="tools left"
        ariaOptionChipRemovedText="removed"
      />,
    );
    await waitForPosition();
    const textfield = getByRole('textbox') as HTMLInputElement;
    await act(async () => {
      fireEvent.change(textfield, { target: { value: 'hammer' } });
    });

    const hammerItem = getByText('Hammer');
    expect(hammerItem).toHaveTextContent('Hammer');

    const opts = await findAllByRole('option');
    expect(opts).toHaveLength(3);

    await act(async () => {
      fireEvent.click(hammerItem);
    });

    await waitFor(async () => {
      const allOptions = await findAllByRole('option');
      expect(allOptions).toHaveLength(3);
    });
  });

  it('has possibility to select item', async () => {
    const { getByRole, container, getByText, rerender } = render(
      <MultiSelect
        labelText="MultiSelect"
        items={tools}
        chipListVisible={true}
        ariaChipActionLabel="Remove"
        removeAllButtonLabel="Remove all selections"
        visualPlaceholder="Choose your tool(s)"
        noItemsText="No items"
        ariaSelectedAmountText="tools selected"
        ariaOptionsAvailableText="tools left"
        ariaOptionChipRemovedText="removed"
      />,
    );
    await waitForPosition();
    let chips = container.querySelectorAll('.fi-chip');
    expect(chips).toHaveLength(0);

    const textfield = getByRole('textbox') as HTMLInputElement;
    await act(async () => {
      fireEvent.focus(textfield);
    });
    rerender(
      <MultiSelect
        labelText="MultiSelect"
        items={tools}
        chipListVisible={true}
        ariaChipActionLabel="Remove"
        removeAllButtonLabel="Remove all selections"
        visualPlaceholder="Choose your tool(s)"
        noItemsText="No items"
        ariaSelectedAmountText="tools selected"
        ariaOptionsAvailableText="tools left"
        ariaOptionChipRemovedText="removed"
      />,
    );
    await waitForPosition();
    const hammerItem = getByText('Hammer');

    await act(async () => {
      fireEvent.click(hammerItem);
    });

    await waitFor(() => {
      chips = container.querySelectorAll('.fi-chip');
      expect(chips).toHaveLength(1);
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
        ariaOptionsAvailableText="tools left"
        ariaOptionChipRemovedText="removed"
      />
    );

    const { container } = render(multiselect);
    await waitForPosition();
    await waitFor(() => {
      expect(container.querySelectorAll('.fi-chip')).toHaveLength(2);

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

    const mockItemSelectionsChange = jest.fn();

    const multiselect = (
      <MultiSelect
        items={animals}
        selectedItems={[
          { price: 5, labelText: 'Turtle', uniqueItemId: 'turtle-987' },
        ]}
        onItemSelect={mockItemSelectionsChange}
        labelText="Animals"
        noItemsText="No animals"
        chipListVisible={true}
        visualPlaceholder="Try to choose animal(s)"
        ariaChipActionLabel="Remove"
        ariaSelectedAmountText="tools selected"
        ariaOptionsAvailableText="tools left"
        ariaOptionChipRemovedText="removed"
      />
    );
    await waitForPosition();
    const { getByText, getAllByText } = render(multiselect);
    const turtleChip = getByText('Turtle');
    await act(async () => {
      fireEvent.click(turtleChip);
    });
    await waitFor(() => {
      expect(mockItemSelectionsChange).toBeCalledTimes(1);
      expect(mockItemSelectionsChange).toBeCalledWith('turtle-987');
      // Popover is open, so therefore two
      expect(getAllByText('Turtle')).toHaveLength(2);
    });
  });

  it('shows correct amount of items after filtering and selecting', async () => {
    let selectedAnimals: Array<MultiSelectData> = [];

    const animals: Array<MultiSelectData> = [
      {
        labelText: 'Rabbit',
        uniqueItemId: 'rabbit-123',
      },
      {
        labelText: 'Snail',
        uniqueItemId: 'snail-321',
      },
      {
        labelText: 'Turtle',
        uniqueItemId: 'turtle-987',
      },
    ];

    const onItemSelect = (animalId: string) => {
      const prevSelectedAnimals = [...selectedAnimals];

      const selectedAnimalIds = prevSelectedAnimals.map(
        (animal) => animal.uniqueItemId,
      );

      if (selectedAnimalIds.includes(animalId)) {
        selectedAnimals = prevSelectedAnimals.filter(
          (animal) => animal.uniqueItemId !== animalId,
        );
      }
      const animal = animals.find((a) => a.uniqueItemId === animalId);
      if (animal === undefined) {
        selectedAnimals = prevSelectedAnimals;
      } else {
        selectedAnimals = prevSelectedAnimals.concat([animal]);
      }
    };

    const multiMutti = (
      <MultiSelect
        items={animals}
        selectedItems={selectedAnimals}
        onItemSelect={onItemSelect}
        labelText="Animals"
        hintText="You can filter options by typing in the field"
        noItemsText="No animals"
        chipListVisible={true}
        visualPlaceholder="Try to choose animals"
        ariaChipActionLabel="Remove"
        ariaSelectedAmountText="animals selected"
        ariaOptionsAvailableText="options available"
        ariaOptionChipRemovedText="removed"
        id="mutti"
      />
    );

    const { getByRole, rerender, findAllByRole } = render(multiMutti);
    await waitForPosition();
    const textfield = getByRole('textbox') as HTMLInputElement;
    await act(async () => {
      fireEvent.change(textfield, { target: { value: 'sn' } });
    });

    const snailItem = await waitFor(() => getByRole('option'));
    expect(snailItem).toHaveTextContent('Snail');

    await act(async () => {
      fireEvent.click(snailItem);
    });

    await waitFor(async () => {
      rerender(
        <MultiSelect
          items={animals}
          selectedItems={selectedAnimals}
          onItemSelect={onItemSelect}
          labelText="Animals"
          hintText="You can filter options by typing in the field"
          noItemsText="No animals"
          chipListVisible={true}
          visualPlaceholder="Try to choose animals"
          ariaChipActionLabel="Remove"
          ariaSelectedAmountText="animals selected"
          ariaOptionsAvailableText="options available"
          ariaOptionChipRemovedText="removed"
          id="mutti"
        />,
      );
      await waitForPosition();
      const allOptions = await findAllByRole('option');
      expect(allOptions).toHaveLength(1);
    });
  });
});

it('should have correct baseClassName', async () => {
  const { container } = render(BasicMultiSelect);
  await waitFor(() => {
    expect(container.firstChild).toHaveClass('fi-multiselect');
  });
});

test('className: has given custom classname', async () => {
  const { container } = render(
    <MultiSelect
      labelText="MultiSelect"
      items={[]}
      noItemsText="No items"
      className="custom-class"
      ariaSelectedAmountText=""
      ariaOptionsAvailableText=""
      ariaOptionChipRemovedText=""
    />,
  );

  await waitFor(() => {
    expect(container.firstChild).toHaveClass('custom-class');
  });
});

test('labelText: has the given text as label', async () => {
  const { queryByText } = render(
    <MultiSelect
      labelText="MultiSelect"
      items={[]}
      noItemsText="No items"
      ariaSelectedAmountText=""
      ariaOptionsAvailableText=""
      ariaOptionChipRemovedText=""
    />,
  );
  await waitFor(() => {
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
      ariaOptionsAvailableText=""
      ariaOptionChipRemovedText=""
    />,
  );
  const inputfield = getByRole('textbox') as HTMLInputElement;
  expect(inputfield).toHaveAttribute('placeholder', 'Select item(s)');
});

test('fullWidth: has the corresponding style and class', () => {
  const { container } = render(
    <MultiSelect
      labelText="MultiSelect"
      items={[]}
      noItemsText="No items"
      fullWidth={true}
      ariaSelectedAmountText=""
      ariaOptionsAvailableText=""
      ariaOptionChipRemovedText=""
    />,
  );
  expect(container.firstChild).toHaveClass('fi-multiselect--full-width');
  expect(container.firstChild).toHaveStyle('width: 100%;');
});

test('id: has the given id', () => {
  const { getByRole } = render(
    <MultiSelect
      id="cb-123"
      labelText="MultiSelect"
      items={[]}
      noItemsText="No items"
      ariaSelectedAmountText=""
      ariaOptionsAvailableText=""
      ariaOptionChipRemovedText=""
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
        ariaOptionsAvailableText=""
        ariaOptionChipRemovedText=""
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
        ariaOptionsAvailableText=""
        ariaOptionChipRemovedText=""
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
      <MultiSelect
        id="123"
        labelText="MultiSelect"
        items={[]}
        noItemsText="No items"
        visualPlaceholder="Select item(s)"
        status="error"
        ariaSelectedAmountText=""
        ariaOptionsAvailableText=""
        ariaOptionChipRemovedText=""
      />,
    );
    expect(container.firstChild).toHaveClass('fi-multiselect--error');
  });
});

describe('disabled', () => {
  it('should not be interactive while disabled', async () => {
    const { getAllByRole, container } = render(
      <MultiSelect
        disabled={true}
        labelText="Tools"
        items={tools}
        noItemsText="No items"
        ariaSelectedAmountText=""
        ariaOptionsAvailableText=""
        ariaOptionChipRemovedText=""
      />,
    );

    const toggleBtn = container.querySelector('.fi-input-toggle-button');
    expect(toggleBtn).not.toBe(null);
    if (toggleBtn) {
      fireEvent.click(toggleBtn);
      await waitFor(() => {
        expect(() => getAllByRole('option')).toThrowError();
      });
    }
  });
});

describe('custom item addition mode', () => {
  it('should allow user to add & remove their own options as selected values', async () => {
    const { container, getByRole, getAllByRole } = render(
      <MultiSelect
        allowItemAddition={true}
        itemAdditionHelpText="Add custom item"
        labelText="Tools"
        items={tools}
        removeAllButtonLabel="Remove all selections"
        ariaSelectedAmountText="tools selected"
        ariaOptionsAvailableText="options available"
        ariaOptionChipRemovedText="removed"
      />,
    );
    await waitForPosition();
    const input = getByRole('textbox');
    await act(async () => {
      fireEvent.change(input, { target: { value: 'hamm' } });
    });

    const items = await waitFor(() => getAllByRole('option'));
    expect(items).toHaveLength(4);
    const hammItem = items.find((item) => item.textContent === 'hamm');

    if (hammItem) {
      await act(async () => {
        fireEvent.click(hammItem);
      });

      await act(async () => {
        fireEvent.change(input, { target: { value: 'ha' } });
      });
      const modifiedItems = await waitFor(() => getAllByRole('option'));
      expect(modifiedItems).toHaveLength(5);
      const haItem = modifiedItems.find((item) => item.textContent === 'ha');

      if (haItem) {
        await act(async () => {
          fireEvent.click(haItem);
        });
        await act(async () => {
          fireEvent.change(input, { target: { value: '' } });
        });

        const appendedItems = await waitFor(() => getAllByRole('option'));
        expect(appendedItems).toHaveLength(11);
        const secondToLastItem = appendedItems[9];
        const lastItem = appendedItems[10];
        expect(secondToLastItem).toHaveTextContent('hamm');
        expect(secondToLastItem).toHaveClass('fi-select-item--selected');
        expect(lastItem).toHaveTextContent('ha');
        expect(lastItem).toHaveClass('fi-select-item--selected');

        const removeAllButton = container.querySelectorAll(
          '.fi-multiselect_removeAllButton',
        )[0];
        await act(async () => {
          fireEvent.click(removeAllButton);
        });

        const resetItems = await waitFor(() => getAllByRole('option'));
        expect(resetItems).toHaveLength(9);
      } else {
        throw new Error('No custom item "ha" found');
      }
    } else {
      throw new Error('No custom item "hamm" found');
    }
  });
});

describe('forward ref', () => {
  it('ref is forwarded to input', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(
      <MultiSelect
        id="123"
        labelText="MultiSelect"
        items={[]}
        noItemsText="No items"
        visualPlaceholder="Select item(s)"
        status="error"
        ariaSelectedAmountText=""
        ariaOptionsAvailableText=""
        ariaOptionChipRemovedText=""
        ref={ref}
      />,
    );

    expect(ref.current?.tagName).toBe('INPUT');
  });
});

describe('listProps', () => {
  it('adds data-test-id to unordered list element', async () => {
    const { getByRole } = render(
      <MultiSelect
        labelText="Test"
        items={[]}
        noItemsText="No items"
        ariaSelectedAmountText=""
        ariaOptionsAvailableText=""
        ariaOptionChipRemovedText=""
        listProps={{
          'data-test-id': 'custom-attr',
        }}
      />,
    );
    await waitForPosition();
    const input = await waitFor(async () => getByRole('textbox'));
    await act(async () => {
      fireEvent.focus(input);
    });
    const menu = await waitFor(() => getByRole('listbox'));
    expect(menu).toHaveAttribute('data-test-id', 'custom-attr');
  });
});

describe('listItemProps', () => {
  it('adds data-test-id to unordered list element', async () => {
    const { getByRole } = render(
      <MultiSelect
        labelText="Test"
        items={[
          {
            labelText: 'Apple',
            uniqueItemId: 'cde456',
            listItemProps: { 'data-test-id': 'apple' },
          },
        ]}
        noItemsText="No items"
        ariaSelectedAmountText=""
        ariaOptionsAvailableText=""
        ariaOptionChipRemovedText=""
      />,
    );
    await waitForPosition();
    const input = await waitFor(() => getByRole('textbox'));
    await act(async () => {
      fireEvent.focus(input);
    });
    const option = await waitFor(() => getByRole('option'));
    expect(option).toHaveAttribute('data-test-id', 'apple');
  });
});

describe('margin', () => {
  it('should have margin style from margin prop', () => {
    const { container } = render(
      <MultiSelect
        labelText="Test"
        items={[]}
        noItemsText="No items"
        ariaSelectedAmountText=""
        ariaOptionsAvailableText=""
        ariaOptionChipRemovedText=""
        margin="xs"
      />,
    );

    expect(container.firstChild).toHaveStyle('margin: 10px');
  });

  it('should have margin style overridden by style prop', async () => {
    const { container } = render(
      <MultiSelect
        labelText="Test"
        items={[]}
        noItemsText="No items"
        ariaSelectedAmountText=""
        ariaOptionsAvailableText=""
        ariaOptionChipRemovedText=""
        margin="xs"
        style={{ margin: 2 }}
      />,
    );
    expect(container.firstChild).toHaveAttribute('style', 'margin: 2px;');
  });
});
