```js
import React from 'react';
import { Dropdown, DropdownItem } from 'suomifi-ui-components';

const [selectedValue, setSelectedValue] = React.useState(null);
const [status, setStatus] = React.useState('default');

const createItems = () => {
  const items = [];
  for (let i = 1; i < 251; i++) {
    items.push(
      <DropdownItem value={`item-value-${i}`} key={`key-${i}`}>
        {`Dropdown item ${i}`}
      </DropdownItem>
    );
  }
  return items;
};

<Dropdown
  name="dropdown_example_1"
  labelText="Dropdown label"
  hintText="Some informative text"
  onChange={(value) => {
    setStatus('default');
    setSelectedValue(value);
  }}
  onBlur={() => {
    if (!selectedValue) {
      setStatus('error');
    } else {
      setStatus('default');
    }
  }}
  status={status}
  statusText={status === 'error' ? 'You must select a value.' : ''}
  visualPlaceholder="Select a value"
>
  {createItems()}
</Dropdown>;
```

```js
import { Dropdown, DropdownItem } from 'suomifi-ui-components';
import { createRef } from 'react';

const exampleRef = createRef();
<>
  <Dropdown
    name="dropdown_example_2"
    visualPlaceholder="Wide dropdown with a visually hidden label and ref"
    labelText="Dropdown label"
    labelMode="hidden"
    ref={exampleRef}
    onChange={() => console.log(exampleRef.current)}
    fullWidth
  >
    <DropdownItem value={'dropdown-item-1'}>
      Dropdown Item 1
    </DropdownItem>
    <DropdownItem value={'dropdown-item-2'}>
      Dropdown Item 2
    </DropdownItem>
  </Dropdown>

  <Dropdown
    name="dropdown_example_3"
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
import React from 'react';
import { Dropdown, DropdownItem } from 'suomifi-ui-components';

const [selectedValue, setSelectedValue] = React.useState(null);
const [status, setStatus] = React.useState('default');

<Dropdown
  name="dropdown_example_1"
  labelText="Dropdown with disabled option"
  hintText="Some informative text"
  status={status}
  visualPlaceholder="Select a value"
>
  <DropdownItem value={'dropdown-item-1'}>
    Dropdown Item 1
  </DropdownItem>
  <DropdownItem value={'dropdown-item-2'}>
    Dropdown Item 2
  </DropdownItem>
  <DropdownItem value={'dropdown-item-3'} disabled>
    Dropdown Item 3
  </DropdownItem>
  <DropdownItem value={'dropdown-item-4'}>
    Dropdown Item 4
  </DropdownItem>
  <DropdownItem value={'dropdown-item-5'}>
    Dropdown Item 5
  </DropdownItem>
</Dropdown>;
```

```js
import { useState } from 'react';
import { Dropdown, DropdownItem } from 'suomifi-ui-components';

const [value, setValue] = useState('');

<Dropdown
  value={value}
  name="dropdown_example_4"
  visualPlaceholder="Select a value"
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
      name="dropdown_example_5"
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
      name="dropdown_example_6"
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

### Drodown as action menu

```js
import { Dropdown, DropdownItem } from 'suomifi-ui-components';

<Dropdown
  visualPlaceholder="Action menu"
  labelText="Dropdown as action menu"
  alwaysShowVisualPlaceholder={true}
  onChange={(action) => console.log(action, 'selected')}
>
  <DropdownItem value={'action-item-1'}>Action Item 1</DropdownItem>
  <DropdownItem value={'action-item-2'}>Action Item 2</DropdownItem>
</Dropdown>;
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
  name="dropdown_example_6"
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
