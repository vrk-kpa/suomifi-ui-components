```js
import { Combobox } from 'suomifi-ui-components';

const tools = [
  {
    name: 'Jackhammer',
    price: 230,
    tax: false,
    labelText: 'Jackhammer'
  },
  {
    name: 'Hammer',
    price: 15,
    tax: true,
    labelText: 'Hammer'
  },
  {
    name: 'Sledgehammer',
    price: 36,
    tax: false,
    labelText: 'Sledgehammer'
  },
  {
    name: 'Spade',
    price: 50,
    tax: true,
    labelText: 'Spade'
  },
  {
    name: 'Powersaw',
    price: 150,
    tax: false,
    labelText: 'Powersaw',
    disabled: true
  },
  {
    name: 'Shovel',
    price: 115,
    tax: true,
    labelText: 'Shovel'
  },
  {
    name: 'Iron stick',
    price: 85,
    tax: false,
    labelText: 'Iron stick'
  },
  {
    name: 'Rake',
    price: 50,
    tax: true,
    labelText: 'Rake'
  },
  {
    name: 'Motorsaw',
    price: 450,
    tax: false,
    labelText: 'Motorsaw',
    disabled: true
  }
];

const defaultSelectedTools = [
  {
    name: 'Hammer',
    price: 15,
    tax: true,
    labelText: 'Hammer'
  },
  {
    name: 'Powersaw',
    price: 150,
    tax: false,
    labelText: 'Powersaw',
    disabled: true
  }
];

<>
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
</>;
```
