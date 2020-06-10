```js
import { Dropdown, Block } from 'suomifi-ui-components';

const dropdownProps = {
  'aria-labelledby': 'dropdown-group'
};

<div>
  <label id="dropdown-group">
    <p>Dropdown group</p>
  </label>
  <Block padding="xs">
    <Dropdown
      visualPlaceholder="Dropdown 1"
      labelText="Dropdown test 1"
      {...dropdownProps}
    >
      <Dropdown.item
        onSelect={() => console.log('dropdown test 1 1')}
      >
        Item 1
      </Dropdown.item>
      <Dropdown.item
        onSelect={() => console.log('dropdown test 1 2')}
      >
        Item 2
      </Dropdown.item>
    </Dropdown>
  </Block>
  <Block padding="xs">
    <Dropdown
      visualPlaceholder="Dropdown 2"
      labelText="Dropdown test 2"
      {...dropdownProps}
    >
      <Dropdown.item
        onSelect={() => console.log('dropdown test 2 1')}
      >
        Item 1
      </Dropdown.item>
      <Dropdown.item
        onSelect={() => console.log('dropdown test 2 2')}
      >
        Item 2
      </Dropdown.item>
    </Dropdown>
  </Block>
</div>;
```
