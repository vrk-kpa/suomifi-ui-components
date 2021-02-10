```js
import { Combobox } from 'suomifi-ui-components';

const tools = [
  {
    name: 'Jackhammer',
    price: 230,
    tax: false,
    labelText: 'Jackhammer',
    selected: false
  },
  {
    name: 'Hammer',
    price: 15,
    tax: true,
    labelText: 'Hammer',
    selected: false
  },
  {
    name: 'Sledgehammer',
    price: 36,
    tax: false,
    labelText: 'Sledgehammer',
    selected: false
  },
  {
    name: 'Spade',
    price: 50,
    tax: true,
    labelText: 'Spade',
    selected: true
  },
  {
    name: 'Powersaw',
    price: 150,
    tax: false,
    labelText: 'Powersaw',
    selected: true,
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
  />
</>;
```
