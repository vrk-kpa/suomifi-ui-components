```js
import { Dropdown } from 'suomifi-ui-components';

<Dropdown
  name="Dropdown"
  labelText="Dropdown label"
  defaultValue={'Dropdown item 1'}
  onChange={(newValue) => console.log(newValue)}
>
  <Dropdown.item value={'Dropdown item 1'}>
    Dropdown Item 1
  </Dropdown.item>
  <Dropdown.item value={'Dropdown item 2'}>
    Dropdown Item 2
  </Dropdown.item>
</Dropdown>;
```

```js
import { Dropdown } from 'suomifi-ui-components';

<Dropdown
  name="Dropdown"
  visualPlaceholder="Dropdown with visually hidden label"
  labelText="Dropdown label"
  labelMode="hidden"
>
  <Dropdown.item value={'Dropdown item 1'}>
    Dropdown Item 1
  </Dropdown.item>
  <Dropdown.item value={'Dropdown item 2'}>
    Dropdown Item 2
  </Dropdown.item>
</Dropdown>;
```

```js
import { Dropdown } from 'suomifi-ui-components';

<Dropdown
  visualPlaceholder="Action menu"
  labelText="Dropdown as action menu label"
  alwaysShowVisualPlaceholder={true}
  onChange={(action) => console.log(action, 'selected')}
>
  <Dropdown.item value={'Action item 1'}>Action Item 1</Dropdown.item>
  <Dropdown.item value={'Action item 2'}>Action Item 2</Dropdown.item>
</Dropdown>;
```

```js
import { useState } from 'react';
import { Dropdown } from 'suomifi-ui-components';

const [value, setValue] = useState(undefined);

<Dropdown
  value={value}
  visualPlaceholder="Dropdown"
  labelText="Dropdown with controlled state"
  onChange={(newValue) => {
    if (window.confirm('Change dropdown value?')) {
      setValue(newValue);
    }
  }}
>
  <Dropdown.item value={'Action item 1'}>Action Item 1</Dropdown.item>
  <Dropdown.item value={'Action item 2'}>Action Item 2</Dropdown.item>
</Dropdown>;
```

```js
import { Dropdown, Block } from 'suomifi-ui-components';

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
      defaultValue={'Dropdown 1 item 2'}
      visualPlaceholder="Dropdown 1"
      labelText="Dropdown 1 label"
      {...dropdownProps}
    >
      <Dropdown.item value={'Dropdown 1 item 1'}>
        Dropdown 1 Item 1
      </Dropdown.item>
      <Dropdown.item value={'Dropdown 1 item 2'}>
        Dropdown 1 Item 2
      </Dropdown.item>
    </Dropdown>
  </Block>
  <Block padding="xs">
    <Dropdown
      defaultValue={'Dropdown 2 item 2'}
      visualPlaceholder="Dropdown 2"
      labelText="Dropdown 2 label"
      {...dropdownProps}
    >
      <Dropdown.item value={'Dropdown 2 item 1'}>
        Dropdown 2 Item 1
      </Dropdown.item>
      <Dropdown.item value={'Dropdown 2 item 2'}>
        Dropdown 2 Item 2
      </Dropdown.item>
    </Dropdown>
  </Block>
</div>;
```
