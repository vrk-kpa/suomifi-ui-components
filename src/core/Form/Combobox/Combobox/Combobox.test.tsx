import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { axeTest } from '../../../../utils/test/axe';
import { Combobox } from './Combobox';

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
  <Combobox
    labelText="Combobox"
    items={tools}
    chipListVisible={true}
    chipActionLabel="Remove"
    removeAllButtonLabel="Remove all selections"
    visualPlaceholder="Choose your tool(s)"
    emptyItemsLabel="No items"
    defaultSelectedItems={defaultSelectedTools}
  />
);

test('should not have basic accessibility issues', async () => {
  await act(async () => {
    axeTest(BasicCombobox);
  });
});

describe('Chips', () => {
  it('should have selected Chips shown', async () => {
    await act(async () => {
      const { container } = render(BasicCombobox);
      expect(container.querySelectorAll('.fi-chip').length).toEqual(2);
    });
  });

  it('first Chip should be removable and removed when clicked', async () => {
    await act(async () => {
      const { container } = render(BasicCombobox);
      let chips = container.querySelectorAll('.fi-chip');
      const chip = chips[0];
      expect(chip).toHaveTextContent('Hammer');
      expect(chip.querySelector('.fi-chip--icon')).not.toBeNull();
      await act(async () => {
        fireEvent.click(chip, {});
      });
      chips = container.querySelectorAll('.fi-chip');
      expect(chips.length).toEqual(1);
      const disabledChip = chips[0];
      expect(disabledChip).toHaveTextContent('Powersaw');
    });
  });

  it('second Chip should be disabled', () => {
    const { container } = render(BasicCombobox);
    const disabledChip = container.querySelectorAll('.fi-chip')[1];
    expect(disabledChip).toHaveTextContent('Powersaw');
    expect(disabledChip).toHaveClass('fi-chip--disabled');
    expect(disabledChip).toHaveAttribute('disabled');
  });

  it('should remove all non-disabled Chips', async () => {
    await act(async () => {
      const { container } = render(BasicCombobox);
      expect(container.querySelectorAll('.fi-chip').length).toEqual(2);
      const removeAllButton = container.querySelectorAll(
        '.fi-combobox_removeAllButton',
      )[0];
      await act(async () => {
        fireEvent.click(removeAllButton, {});
      });
      const chips = container.querySelectorAll('.fi-chip');
      expect(chips.length).toEqual(1);
    });
  });
});

describe('controlled', () => {
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
    const combobox = (
      <Combobox
        controlledItems={controlledItems}
        labelText="Combobox"
        items={tools}
        chipListVisible={true}
        chipActionLabel="Remove"
        removeAllButtonLabel="Remove all selections"
        visualPlaceholder="Choose your tool(s)"
        emptyItemsLabel="No items"
        defaultSelectedItems={defaultSelectedTools}
      />
    );

    await act(async () => {
      const { container } = render(combobox);
      expect(container.querySelectorAll('.fi-chip').length).toEqual(2);

      const chips = container.querySelectorAll('.fi-chip');

      const disabledChip = chips[0];
      expect(disabledChip).toHaveTextContent('Shovel');
      expect(disabledChip).toHaveClass('fi-chip--disabled');
      expect(disabledChip).toHaveAttribute('disabled');

      const otherChip = chips[1];
      expect(otherChip).toHaveTextContent('Sledgehammer');
    });
  });
});
