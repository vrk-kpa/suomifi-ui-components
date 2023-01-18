```js
import { Dropdown, DropdownItem } from 'suomifi-ui-components';

<Dropdown
  name="Dropdown"
  labelText="Dropdown label"
  defaultValue={'dropdown-item-2'}
  onChange={(value) => console.log(value)}
>
  <DropdownItem value={'dropdown-item-1'}>
    Dropdown Item 1
  </DropdownItem>
  <DropdownItem value={'dropdown-item-2'}>
    Dropdown Item 2
  </DropdownItem>
  <DropdownItem value={'dropdown-item-3'}>
    Dropdown Item 3
  </DropdownItem>
  <DropdownItem value={'dropdown-item-4'}>
    Dropdown Item 4
  </DropdownItem>
  <DropdownItem value={'dropdown-item-5'}>
    Dropdown Item 5
  </DropdownItem>
  <DropdownItem value={'dropdown-item-6'}>
    Dropdown Item 6
  </DropdownItem>
  <DropdownItem value={'dropdown-item-7'}>
    Dropdown Item 7
  </DropdownItem>
  <DropdownItem value={'dropdown-item-8'}>
    Dropdown Item 8
  </DropdownItem>
  <DropdownItem value={'dropdown-item-9'}>
    Dropdown Item 9
  </DropdownItem>
  <DropdownItem value={'dropdown-item-10'}>
    Dropdown Item 10
  </DropdownItem>
  <DropdownItem value={'dropdown-item-11'}>
    Dropdown Item 11
  </DropdownItem>
  <DropdownItem value={'dropdown-item-12'}>
    Dropdown Item 12
  </DropdownItem>
  <DropdownItem value={'dropdown-item-13'}>
    Dropdown Item 13
  </DropdownItem>
  <DropdownItem value={'dropdown-item-14'}>
    Dropdown Item 14
  </DropdownItem>
  <DropdownItem value={'dropdown-item-15'}>
    Dropdown Item 15
  </DropdownItem>
</Dropdown>;
```

```js
import { Dropdown, DropdownItem } from 'suomifi-ui-components';
import { createRef } from 'react';

const exampleRef = createRef();
<>
  <Dropdown
    name="Dropdown"
    visualPlaceholder="Dropdown with visually hidden label and ref"
    labelText="Dropdown label"
    labelMode="hidden"
    ref={exampleRef}
    onChange={() => console.log(exampleRef.current)}
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

### Dropdown with a tooltip

```js
import {
  Dropdown,
  DropdownItem,
  Tooltip,
  Heading,
  Text
} from 'suomifi-ui-components';

const labelText = 'Dropdown with a tooltip';

<Dropdown
  labelText={labelText}
  tooltipComponent={
    <Tooltip
      ariaToggleButtonLabelText={`${labelText}, additional information`}
      ariaCloseButtonLabelText={`${labelText}, close additional information`}
    >
      <Heading variant="h5" as="h2">
        Tooltip
      </Heading>
      <Text>Text content for the tooltip</Text>
    </Tooltip>
  }
>
  <DropdownItem value={'item-1'}>Item 1</DropdownItem>
  <DropdownItem value={'item-2'}>Item 2</DropdownItem>
</Dropdown>;
```
