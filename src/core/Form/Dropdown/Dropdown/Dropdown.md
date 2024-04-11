The `<Dropdown>` component is used to select a value from a list of options. The component is rendered as a combination of a `<button>` element and an ARIA listbox. It should be used when the amount of options is manageable in size, i.e. the user does not need filtering to find the correct option.

If there are a lot of options in the list, consider using the filterable <a href="./#/Components/SingleSelect">SingleSelect</a> component or filter the list beforehand with some additional logic.

If there are only 2-3 options, consider using the <a href="./#/Components/RadioButton">RadioButton</a> component instead.

Examples:

- [Basic use](./#/Components/Dropdown?id=basic-use)
- [Default value](./#/Components/Dropdown?id=default-value)
- [Controlled value](./#/Components/Dropdown?id=controlled-value)
- [Accessing the component with ref](./#/Components/Dropdown?id=accessing-the-component-with-ref)
- [Error status](./#/Components/Dropdown?id=error-status)
- [Disabled](./#/Components/Dropdown?id=disabled)
- [Full width](./#/Components/Dropdown?id=full-width)
- [Tooltip](./#/Components/Dropdown?id=tooltip)

<div style="margin-bottom: 5px">
  [Props & methods (Dropdown)](./#/Components/Dropdown?id=props--methods)
</div>
<div style="margin-bottom: 40px">
  [Props & methods (DropdownItem)](./#/Components/Dropdown?id=dropdownitem)
</div>

### Basic use

Use `<DropdownItem>` components to compose list.

If instructions are needed, use the `hintText` prop.

The `visualPlaceholder` prop is used to apply a placeholder text to the input. For accessibility reasons, do not use placeholders for instructions.

```js
import { Dropdown, DropdownItem } from 'suomifi-ui-components';

const countries = [
  {
    name: 'Finland',
    key: 'finland'
  },
  {
    name: 'Sweden',
    key: 'sweden'
  },
  {
    name: 'Norway',
    key: 'norway'
  },
  {
    name: 'Denmark',
    key: 'denmark'
  },
  {
    name: 'Iceland',
    key: 'iceland'
  }
];

<Dropdown
  labelText="Country"
  hintText="Select your current country of residence"
  visualPlaceholder="Choose country"
>
  {countries.map((country) => (
    <DropdownItem key={country.key} value={country.key}>
      {country.name}
    </DropdownItem>
  ))}
</Dropdown>;
```

### Default value

Set the input's initial value with the `defaultValue` prop. The default value must match with the value of some DropdownItem in the list.

```js
import { Dropdown, DropdownItem } from 'suomifi-ui-components';

const countries = [
  {
    name: 'Finland',
    key: 'finland'
  },
  {
    name: 'Sweden',
    key: 'sweden'
  },
  {
    name: 'Norway',
    key: 'norway'
  },
  {
    name: 'Denmark',
    key: 'denmark'
  },
  {
    name: 'Iceland',
    key: 'iceland'
  }
];

<Dropdown
  labelText="Country"
  hintText="Select your current country of residence"
  defaultValue="norway"
>
  {countries.map((country) => (
    <DropdownItem key={country.key} value={country.key}>
      {country.name}
    </DropdownItem>
  ))}
</Dropdown>;
```

### Controlled value

Use the `value` prop to access and control the input's value programmatically.

A typical use case involves setting the value manually in the `onChange()` function.

```js
import { Dropdown, DropdownItem } from 'suomifi-ui-components';
import { useState } from 'react';

const [controlledValue, setControlledValue] = useState('');

const countries = [
  {
    name: 'Finland',
    key: 'finland'
  },
  {
    name: 'Sweden',
    key: 'sweden'
  },
  {
    name: 'Norway',
    key: 'norway'
  },
  {
    name: 'Denmark',
    key: 'denmark'
  },
  {
    name: 'Iceland',
    key: 'iceland'
  }
];

<Dropdown
  labelText="Country"
  hintText="Select your current country of residence"
  value={controlledValue}
  onChange={(newValue) => setControlledValue(newValue)}
>
  {countries.map((country) => (
    <DropdownItem key={country.key} value={country.key}>
      {country.name}
    </DropdownItem>
  ))}
</Dropdown>;
```

### Accessing the component with ref

The component can be accessed programmatically with React ref. The ref points to the Dropdown's `<button>` element, and contains the `<input>` with selected value within.

```js
import { Dropdown, DropdownItem } from 'suomifi-ui-components';
import { useRef } from 'react';

const dropdownRef = useRef();

const countries = [
  {
    name: 'Finland',
    key: 'finland'
  },
  {
    name: 'Sweden',
    key: 'sweden'
  },
  {
    name: 'Norway',
    key: 'norway'
  },
  {
    name: 'Denmark',
    key: 'denmark'
  },
  {
    name: 'Iceland',
    key: 'iceland'
  }
];

<Dropdown
  labelText="Country"
  hintText="Select your current country of residence"
  ref={dropdownRef}
  onChange={() => console.log(dropdownRef.current)}
>
  {countries.map((country) => (
    <DropdownItem key={country.key} value={country.key}>
      {country.name}
    </DropdownItem>
  ))}
</Dropdown>;
```

### Error status

Control the error status of the component using the `status` and `statusText` props.

```js
import { Dropdown, DropdownItem } from 'suomifi-ui-components';
import { useState } from 'react';

const [status, setStatus] = useState('error');

const countries = [
  {
    name: 'Finland',
    key: 'finland'
  },
  {
    name: 'Sweden',
    key: 'sweden'
  },
  {
    name: 'Norway',
    key: 'norway'
  },
  {
    name: 'Denmark',
    key: 'denmark'
  },
  {
    name: 'Iceland',
    key: 'iceland'
  }
];

<Dropdown
  labelText="Country"
  hintText="Select your current country of residence"
  onChange={() => setStatus('default')}
  status={status}
  statusText={status === 'error' ? 'This field is required' : ''}
>
  {countries.map((country) => (
    <DropdownItem key={country.key} value={country.key}>
      {country.name}
    </DropdownItem>
  ))}
</Dropdown>;
```

### Disabled

The entire input or individual options can be disabled

```js
import { Dropdown, DropdownItem } from 'suomifi-ui-components';

const countries = [
  {
    name: 'Finland',
    key: 'finland',
    disabled: false
  },
  {
    name: 'Sweden',
    key: 'sweden',
    disabled: false
  },
  {
    name: 'Norway',
    key: 'norway',
    disabled: false
  },
  {
    name: 'Denmark',
    key: 'denmark',
    disabled: false
  },
  {
    name: 'Iceland',
    key: 'iceland',
    disabled: true
  }
];

<>
  <Dropdown
    labelText="Country"
    hintText="Select your current country of residence"
    disabled
  >
    {countries.map((country) => (
      <DropdownItem key={country.key} value={country.key}>
        {country.name}
      </DropdownItem>
    ))}
  </Dropdown>

  <Dropdown
    labelText="Country"
    hintText="Select your current country of residence"
    visualPlaceholder="Choose country"
  >
    {countries.map((country) => (
      <DropdownItem
        key={country.key}
        value={country.key}
        disabled={country.disabled}
      >
        {country.name}
      </DropdownItem>
    ))}
  </Dropdown>
</>;
```

### Full width

You can use the `fullWidth` prop to make the input take all available horizontal space.

```js
import { Dropdown, DropdownItem } from 'suomifi-ui-components';

const countries = [
  {
    name: 'Finland',
    key: 'finland'
  },
  {
    name: 'Sweden',
    key: 'sweden'
  },
  {
    name: 'Norway',
    key: 'norway'
  },
  {
    name: 'Denmark',
    key: 'denmark'
  },
  {
    name: 'Iceland',
    key: 'iceland'
  }
];

<Dropdown
  labelText="Country"
  hintText="Select your current country of residence"
  visualPlaceholder="Choose country"
  fullWidth
>
  {countries.map((country) => (
    <DropdownItem key={country.key} value={country.key}>
      {country.name}
    </DropdownItem>
  ))}
</Dropdown>;
```

### Tooltip

A `<Tooltip>` component can be used with Dropdown to provide additional information.

In terms of instructive texts, Tooltip should only be used as a "last resort" when the info text is too long for `hintText`. Tooltip can be used for other nice-to-know information.

For instructions regarding how to ensure your Tooltip is accessible, please refer to the [Tooltip documentation](./#/Components/Tooltip).

```js
import {
  Dropdown,
  DropdownItem,
  Tooltip,
  Heading,
  Text
} from 'suomifi-ui-components';

const labelText = 'Country';

const countries = [
  {
    name: 'Finland',
    key: 'finland'
  },
  {
    name: 'Sweden',
    key: 'sweden'
  },
  {
    name: 'Norway',
    key: 'norway'
  },
  {
    name: 'Denmark',
    key: 'denmark'
  },
  {
    name: 'Iceland',
    key: 'iceland'
  }
];

<Dropdown
  labelText={labelText}
  hintText="Select your current country of residence"
  visualPlaceholder="Choose country"
  tooltipComponent={
    <Tooltip
      ariaToggleButtonLabelText={`${labelText}, show additional information`}
      ariaCloseButtonLabelText={`${labelText}, close additional information`}
    >
      <Heading variant="h5" as="h2">
        Why you are being asked this information?
      </Heading>
      <Text>
        Country of residence information is used to provide you
        personalized assistance in your local area.
      </Text>
    </Tooltip>
  }
>
  {countries.map((country) => (
    <DropdownItem key={country.key} value={country.key}>
      {country.name}
    </DropdownItem>
  ))}
</Dropdown>;
```

### Props & methods

Dropdown component supports [margin props](./#/Spacing/Margin%20props) for spacing.
