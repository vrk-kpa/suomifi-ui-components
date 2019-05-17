```js
import { Dropdown } from 'suomifi-ui-components';

<Dropdown className="dropdown-test" name="Dropdown">
  <Dropdown.item onSelect={() => console.log('dropdown test 1')}>
    Item 1
  </Dropdown.item>
  <Dropdown.item onSelect={() => console.log('dropdown test 2')}>
    Item 2
  </Dropdown.item>
</Dropdown>;
```
