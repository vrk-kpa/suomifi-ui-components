import React from 'react';
import { render, act } from '@testing-library/react';
import { axeTest } from '../../../../utils/test/axe';
import { Select } from './Select';

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

const BasicCombobox = (
  <Select
    labelText="MultiSelect"
    items={tools}
    visualPlaceholder="Choose your tool(s)"
    noItemsText="No items"
    defaultSelectedItem={defaultSelectedTool}
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

// describe('Controlled', () => {
//   it('has the controlled items as selected + disabled', async () => {
//     const controlledItems = [
//       {
//         name: 'Shovel',
//         price: 115,
//         tax: true,
//         labelText: 'Shovel',
//         uniqueItemId: 's05111511',
//         disabled: true,
//       },
//       {
//         name: 'Sledgehammer',
//         price: 36,
//         tax: false,
//         labelText: 'Sledgehammer',
//         uniqueItemId: 'sh908293482',
//       },
//     ];
//     const multiselect = (
//       <Select
//         selectedItems={controlledItems}
//         labelText="MultiSelect"
//         items={tools}
//         chipListVisible={true}
//         ariaChipActionLabel="Remove"
//         removeAllButtonLabel="Remove all selections"
//         visualPlaceholder="Choose your tool(s)"
//         noItemsText="No items"
//         defaultSelectedItems={defaultSelectedTools}
//         ariaSelectedAmountText="tools selected"
//       />
//     );

//     await act(async () => {
//       const { container } = render(multiselect);
//       expect(container.querySelectorAll('.fi-chip').length).toEqual(2);

//       const chips = container.querySelectorAll('.fi-chip');

//       const disabledChip = chips[0];
//       expect(disabledChip).toHaveTextContent('Shovel');
//       expect(disabledChip).toHaveClass('fi-chip--disabled');
//       expect(disabledChip).toHaveAttribute('aria-disabled');

//       const otherChip = chips[1];
//       expect(otherChip).toHaveTextContent('Sledgehammer');
//     });
//   });

//   it('does not allow removing of items by clicking', async () => {
//     const animals = [
//       {
//         age: 2,
//         labelText: 'Rabbit',
//         uniqueItemId: 'rabbit-123',
//       },
//       {
//         age: 1,
//         labelText: 'Snail',
//         uniqueItemId: 'snail-321',
//       },
//       {
//         price: 5,
//         labelText: 'Turtle',
//         uniqueItemId: 'turtle-987',
//       },
//     ];

//     const multiselect = (
//       <Select
//         items={animals}
//         selectedItems={[
//           { price: 5, labelText: 'Turtle', uniqueItemId: 'turtle-987' },
//         ]}
//         labelText="Animals"
//         noItemsText="No animals"
//         chipListVisible={true}
//         visualPlaceholder="Try to choose animal(s)"
//         ariaChipActionLabel="Remove"
//         ariaSelectedAmountText="tools selected"
//       />
//     );

//     const { getByText, getAllByText } = render(multiselect);
//     const turtleChip = getByText('Turtle');
//     await act(async () => {
//       fireEvent.click(turtleChip, {});
//     });
//     // Popover is open, so therefore two
//     expect(getAllByText('Turtle').length).toBe(2);
//   });
// });

// it('should have correct baseClassName', async () => {
//   await act(async () => {
//     const { container } = render(BasicCombobox);
//     expect(container.firstChild).toHaveClass('fi-multiselect');
//   });
// });

// test('className: has given custom classname', async () => {
//   await act(async () => {
//     const { container } = render(
//       <Select
//         labelText="MultiSelect"
//         items={[]}
//         noItemsText="No items"
//         className="custom-class"
//         ariaSelectedAmountText=""
//       />,
//     );
//     expect(container.firstChild).toHaveClass('custom-class');
//   });
// });

// test('labelText: has the given text as label', async () => {
//   await act(async () => {
//     const { queryByText } = render(
//       <Select
//         labelText="MultiSelect"
//         items={[]}
//         noItemsText="No items"
//         ariaSelectedAmountText=""
//       />,
//     );
//     expect(queryByText('MultiSelect')).not.toBeNull();
//   });
// });

// test('visualPlaceholder: has the given text as placeholder attribute', () => {
//   const { getByRole } = render(
//     <Select
//       labelText="MultiSelect"
//       items={[]}
//       noItemsText="No items"
//       visualPlaceholder="Select item(s)"
//       ariaSelectedAmountText=""
//     />,
//   );
//   const inputfield = getByRole('textbox') as HTMLInputElement;
//   expect(inputfield).toHaveAttribute('placeholder', 'Select item(s)');
// });

// test('id: has the given id', () => {
//   const { getByRole } = render(
//     <Select
//       id="cb-123"
//       labelText="MultiSelect"
//       items={[]}
//       noItemsText="No items"
//       ariaSelectedAmountText=""
//     />,
//   );
//   expect(getByRole('textbox')).toHaveAttribute('id', 'cb-123');
// });

// describe('statusText', () => {
//   it('should have element and correct classname for it', () => {
//     const { getByText } = render(
//       <Select
//         id="123"
//         labelText="MultiSelect"
//         items={[]}
//         noItemsText="No items"
//         visualPlaceholder="Select item(s)"
//         statusText="EROR EROR"
//         ariaSelectedAmountText=""
//       />,
//     );
//     const statusText = getByText('EROR EROR');
//     expect(statusText).toHaveClass('fi-status-text');
//   });

//   it('will be added to input aria-describedby', () => {
//     const { getByRole } = render(
//       <Select
//         id="123"
//         labelText="MultiSelect"
//         items={[]}
//         noItemsText="No items"
//         visualPlaceholder="Select item(s)"
//         statusText="EROR EROR"
//         ariaSelectedAmountText=""
//       />,
//     );
//     expect(getByRole('textbox')).toHaveAttribute(
//       'aria-describedby',
//       '123-statusText 123-selectedItems-length',
//     );
//   });
// });

// describe('status', () => {
//   it('should have error classname', () => {
//     const { container } = render(
//       <Select
//         id="123"
//         labelText="MultiSelect"
//         items={[]}
//         noItemsText="No items"
//         visualPlaceholder="Select item(s)"
//         status="error"
//         ariaSelectedAmountText=""
//       />,
//     );
//     expect(container.firstChild).toHaveClass('fi-multiselect--error');
//   });
// });
