```js
import { Dropdown, DropdownItem } from 'suomifi-ui-components';
<Dropdown
  name="Dropdown"
  labelText="Dropdown label"
  defaultValue={'dropdown-item-2'}
  onChange={(newValue) => console.log(newValue)}
>
  <DropdownItem value={'dropdown-item-1'}>
    Dropdown Item 1
  </DropdownItem>
  <DropdownItem value={'dropdown-item-2'}>
    Dropdown Item 2
  </DropdownItem>
</Dropdown>;
```

```js
import { Dropdown, DropdownItem } from 'suomifi-ui-components';
<>
  <Dropdown
    name="Dropdown"
    visualPlaceholder="Dropdown with visually hidden label"
    labelText="Dropdown label"
    labelMode="hidden"
  >
    <DropdownItem value={'dropdown-item-1'}>
      Dropdown Item 1
    </DropdownItem>
    <DropdownItem value={'dropdown-item-2'}>
      Dropdown Item 2
    </DropdownItem>
  </Dropdown>

  <Dropdown
    labelText="Disabled dropdown"
    defaultValue={'dropdown-item-2'}
    disabled
  >
    <DropdownItem value={'dropdown-item-1'}>
      Dropdown Item 1
    </DropdownItem>
    <DropdownItem value={'dropdown-item-2'}>
      Dropdown Item 2
    </DropdownItem>
  </Dropdown>
</>;
```

```js
import { Dropdown, DropdownItem } from 'suomifi-ui-components';

<Dropdown
  visualPlaceholder="Action menu"
  labelText="Dropdown as action menu label"
  alwaysShowVisualPlaceholder={true}
  onChange={(action) => console.log(action, 'selected')}
>
  <DropdownItem value={'action-item-1'}>Action Item 1</DropdownItem>
  <DropdownItem value={'action-item-2'}>Action Item 2</DropdownItem>
</Dropdown>;
```

```js
import { useState } from 'react';
import { Dropdown, DropdownItem } from 'suomifi-ui-components';

const [value, setValue] = useState('');

<Dropdown
  value={value}
  name="Dropdown"
  visualPlaceholder="Dropdown"
  labelText="Dropdown with controlled state"
  onChange={(newValue) => {
    if (window.confirm('Change dropdown value?')) {
      setValue(newValue);
    }
  }}
>
  <DropdownItem value={'dropdown-item-1'}>
    Dropdown Item 1
  </DropdownItem>
  <DropdownItem value={'dropdown-item-2'}>
    Dropdown Item 2
  </DropdownItem>
</Dropdown>;
```

```js
import { Dropdown, DropdownItem, Block } from 'suomifi-ui-components';

const dropdownProps = {
  'aria-labelledby': 'dropdown-group',
  onChange: (newValue) => console.log(newValue)
};

<div>
  <label id="dropdown-group">
    <p>Dropdown group</p>
  </label>
  <Block padding="xs">
    <Dropdown
      defaultValue={'dropdown-1-item-1'}
      visualPlaceholder="Dropdown 1"
      labelText="Dropdown 1 label"
      {...dropdownProps}
    >
      <DropdownItem value={'dropdown-1-item-1'}>
        Dropdown 1 Item 1
      </DropdownItem>
      <DropdownItem value={'dropdown-1-item-2'}>
        Dropdown 1 Item 2
      </DropdownItem>
    </Dropdown>
  </Block>
  <Block padding="xs">
    <Dropdown
      defaultValue={'dropdown-2-item-2'}
      visualPlaceholder="Dropdown 2"
      labelText="Dropdown 2 label"
      {...dropdownProps}
    >
      <DropdownItem value={'dropdown-2-item-1'}>
        Dropdown 2 Item 1
      </DropdownItem>
      <DropdownItem value={'dropdown-2-item-2'}>
        Dropdown 2 Item 2
      </DropdownItem>
    </Dropdown>
  </Block>
</div>;
```
