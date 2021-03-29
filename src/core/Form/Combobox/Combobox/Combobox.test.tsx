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

it('should not have basic accessibility issues', async () => {
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
      const hammerChip = chips[0];
      expect(hammerChip).toHaveTextContent('Hammer');
      expect(hammerChip.querySelector('.fi-chip--icon')).not.toBeNull();
      await act(async () => {
        fireEvent.click(hammerChip, {});
      });
      chips = container.querySelectorAll('.fi-chip');
      expect(chips.length).toEqual(1);
      const disabledChip = chips[0];
      expect(disabledChip).toHaveTextContent('Powersaw');
    });
  });

  test('onItemSelect: called with uniqueItem id, when clicking non-disabled Chip', async () => {
    await act(async () => {
      const onItemSelect = (uniqueItemId: string) => console.log(uniqueItemId);
      const onItemSelectSpy = jest.spyOn(console, 'log');
      const { container } = render(
        <Combobox
          labelText="Combobox"
          items={tools}
          chipListVisible={true}
          chipActionLabel="Remove"
          removeAllButtonLabel="Remove all selections"
          visualPlaceholder="Choose your tool(s)"
          emptyItemsLabel="No items"
          defaultSelectedItems={defaultSelectedTools}
          onItemSelect={onItemSelect}
        />,
      );
      const hammerChip = container.querySelectorAll('.fi-chip')[0];
      await act(async () => {
        fireEvent.click(hammerChip, {});
      });
      expect(onItemSelectSpy).toBeCalledWith('h9823523');
    });
  });

  it('second Chip should be disabled', () => {
    const { container } = render(BasicCombobox);
    const disabledChip = container.querySelectorAll('.fi-chip')[1];
    expect(disabledChip).toHaveTextContent('Powersaw');
    expect(disabledChip).toHaveClass('fi-chip--disabled');
    expect(disabledChip).toHaveAttribute('disabled');
  });

  it('should remove all non-disabled Chips when pressing "Remove all" button', async () => {
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

  test('onRemoveAll: should be called when pressing "Remove all" button', async () => {
    await act(async () => {
      const mockOnRemoveAll = jest.fn();
      const { container } = render(
        <Combobox
          labelText="Combobox"
          items={tools}
          chipListVisible={true}
          chipActionLabel="Remove"
          removeAllButtonLabel="Remove all selections"
          visualPlaceholder="Choose your tool(s)"
          emptyItemsLabel="No items"
          defaultSelectedItems={defaultSelectedTools}
          onRemoveAll={mockOnRemoveAll}
        />,
      );
      const removeAllButton = container.querySelectorAll(
        '.fi-combobox_removeAllButton',
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
    const combobox = (
      <Combobox
        selectedItems={controlledItems}
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

it('should have correct baseClassName', async () => {
  await act(async () => {
    const { container } = render(BasicCombobox);
    expect(container.firstChild).toHaveClass('fi-combobox');
  });
});

test('className: has given custom classname', async () => {
  await act(async () => {
    const { container } = render(
      <Combobox
        labelText="Combobox"
        items={[]}
        emptyItemsLabel="No items"
        className="custom-class"
      />,
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});

test('labelText: has the given text as label', async () => {
  await act(async () => {
    const { queryByText } = render(
      <Combobox labelText="Combobox" items={[]} emptyItemsLabel="No items" />,
    );
    expect(queryByText('Combobox')).not.toBeNull();
  });
});

test('visualPlaceholder: has the given text as placeholder attribute', () => {
  const { getByRole } = render(
    <Combobox
      labelText="Combobox"
      items={[]}
      emptyItemsLabel="No items"
      visualPlaceholder="Select item(s)"
    />,
  );
  const inputfield = getByRole('textbox') as HTMLInputElement;
  expect(inputfield).toHaveAttribute('placeholder', 'Select item(s)');
});

test('id: has the given id', () => {
  const { getByRole } = render(
    <Combobox
      id="cb-123"
      labelText="Combobox"
      items={[]}
      emptyItemsLabel="No items"
    />,
  );
  expect(getByRole('textbox')).toHaveAttribute('id', 'cb-123');
});

describe('statusText', () => {
  it('should have element and correct classname for it', () => {
    const { getByText } = render(
      <Combobox
        id="123"
        labelText="Combobox"
        items={[]}
        emptyItemsLabel="No items"
        visualPlaceholder="Select item(s)"
        statusText="EROR EROR"
      />,
    );
    const statusText = getByText('EROR EROR');
    expect(statusText).toHaveClass('fi-status-text');
  });

  it('will be added to input aria-describedby', () => {
    const { getByRole } = render(
      <Combobox
        id="123"
        labelText="Combobox"
        items={[]}
        emptyItemsLabel="No items"
        visualPlaceholder="Select item(s)"
        statusText="EROR EROR"
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
      <Combobox
        id="123"
        labelText="Combobox"
        items={[]}
        emptyItemsLabel="No items"
        visualPlaceholder="Select item(s)"
        status="error"
      />,
    );
    expect(container.firstChild).toHaveClass('fi-combobox--error');
  });
});
