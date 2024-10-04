The `<SingleSelect>` component is used to select one item from a list of options. The list can also be filtered by typing.

If you need to select multiple options, use the [MultiSelect](./#/Components/MultiSelect) component instead.

If your list only contains a few options (user does not need filtering to find the correct option), use the [Dropdown](./#/Components/Dropdown) component instead.

Examples:

- [Basic use](./#/Components/SingleSelect?id=basic-use)
- [Default selected items](./#/Components/SingleSelect?id=default-selected-items)
- [Error status](./#/Components/SingleSelect?id=error-status)
- [Allowing users to add their own item](./#/Components/SingleSelect?id=allowing-users-to-add-their-own-item)
- [Controlled state](./#/Components/SingleSelect?id=controlled-state)
- [Controlled state with custom option enabled](./#/Components/SingleSelect?id=controlled-state-with-custom-option-enabled)
- [Disabled](./#/Components/SingleSelect?id=disabled)
- [Loading indicator](./#/Components/SingleSelect?id=loading-indicator)
- [Full width](./#/Components/SingleSelect?id=full-width)
- [Tooltip](./#/Components/SingleSelect?id=tooltip)

<div style="margin-bottom: 40px">
  [Props & methods](./#/Components/SingleSelect?id=props--methods)
</div>

### Basic use

- Provide a descriptive `labelText` for the component
- Each object in the `items` list must contain their own visible `labelText` and a `uniqueItemId`
- Provide a `clearButtonLabel` to label the button which clears the input
- Provide a `hintText` for instructions
- The `visualPlaceholder` prop is used to apply a placeholder text to the input. For accessibility reasons, do not use placeholders for instructions
- The `noItemsText` is shown when the user filters the list in a way that does not produce any results
- Provide an `ariaOptionsAvailableText` which is read by screen readers when the user filters the list by typing (preceded by the amount of items matching the filter)

```js
import { SingleSelect } from 'suomifi-ui-components';

const countries = [
  {
    labelText: 'Switzerland',
    uniqueItemId: 'sw2435626'
  },
  {
    labelText: 'France',
    uniqueItemId: 'fr9823523'
  },
  {
    labelText: 'Spain',
    uniqueItemId: 'sp908293482'
  },
  {
    labelText: 'Bulgaria',
    uniqueItemId: 'bg82502335'
  },
  {
    labelText: 'Slovenia',
    uniqueItemId: 'sl9081231'
  },
  {
    labelText: 'Norway',
    uniqueItemId: 'no05111511'
  },
  {
    labelText: 'Germany',
    uniqueItemId: 'ge3451261'
  },
  {
    labelText: 'Finland',
    uniqueItemId: 'fi09282626'
  },
  {
    labelText: 'Poland',
    uniqueItemId: 'po6126266'
  }
];

<SingleSelect
  labelText="Country of residence"
  hintText="Select your current country of residence. You can filter options by typing in the field."
  clearButtonLabel="Clear selection"
  items={countries}
  visualPlaceholder="Choose country"
  noItemsText="No items"
  ariaOptionsAvailableTextFunction={(amount) =>
    amount === 1
      ? `${amount} option available`
      : `${amount} options available`
  }
  onChange={(value) => console.log(value)}
/>;
```

### Default selected item

Set an initial selection using the `defaultSelectedItems` prop. The object must match an object in the `items` array.

```js
import { SingleSelect } from 'suomifi-ui-components';

const countries = [
  {
    labelText: 'Switzerland',
    uniqueItemId: 'sw2435626'
  },
  {
    labelText: 'France',
    uniqueItemId: 'fr9823523'
  },
  {
    labelText: 'Spain',
    uniqueItemId: 'sp908293482'
  },
  {
    labelText: 'Bulgaria',
    uniqueItemId: 'bg82502335'
  },
  {
    labelText: 'Slovenia',
    uniqueItemId: 'sl9081231'
  },
  {
    labelText: 'Norway',
    uniqueItemId: 'no05111511'
  },
  {
    labelText: 'Germany',
    uniqueItemId: 'ge3451261'
  },
  {
    labelText: 'Finland',
    uniqueItemId: 'fi09282626'
  },
  {
    labelText: 'Poland',
    uniqueItemId: 'po6126266'
  }
];

const defaultSelection = {
  labelText: 'Germany',
  uniqueItemId: 'ge3451261'
};

<SingleSelect
  labelText="Country of residence"
  hintText="Select your current country of residence. You can filter options by typing in the field."
  clearButtonLabel="Clear selection"
  items={countries}
  defaultSelectedItem={defaultSelection}
  visualPlaceholder="Choose country"
  noItemsText="No items"
  ariaOptionsAvailableTextFunction={(amount) =>
    amount === 1
      ? `${amount} option available`
      : `${amount} options available`
  }
/>;
```

### Error status

Control the error status of the component using the `status` and `statusText` props.

```js
import { SingleSelect } from 'suomifi-ui-components';
import { useState } from 'react';

const countries = [
  {
    labelText: 'Switzerland',
    uniqueItemId: 'sw2435626'
  },
  {
    labelText: 'France',
    uniqueItemId: 'fr9823523'
  },
  {
    labelText: 'Spain',
    uniqueItemId: 'sp908293482'
  },
  {
    labelText: 'Bulgaria',
    uniqueItemId: 'bg82502335'
  },
  {
    labelText: 'Slovenia',
    uniqueItemId: 'sl9081231'
  },
  {
    labelText: 'Norway',
    uniqueItemId: 'no05111511'
  },
  {
    labelText: 'Germany',
    uniqueItemId: 'ge3451261'
  },
  {
    labelText: 'Finland',
    uniqueItemId: 'fi09282626'
  },
  {
    labelText: 'Poland',
    uniqueItemId: 'po6126266'
  }
];

const [error, setError] = useState(true);

<SingleSelect
  labelText="Country of residence"
  hintText="Select your current country of residence. You can filter options by typing in the field."
  clearButtonLabel="Clear selection"
  items={countries}
  visualPlaceholder="Choose country"
  noItemsText="No items"
  ariaOptionsAvailableTextFunction={(amount) =>
    amount === 1
      ? `${amount} option available`
      : `${amount} options available`
  }
  status={error ? 'error' : 'default'}
  statusText={error ? 'This field is required' : ''}
  onItemSelectionChange={(newItem) =>
    newItem !== null ? setError(false) : setError(true)
  }
/>;
```

### Allowing users to add their own item

Apply the `allowItemAddition` prop to enable functionality which allows users to add a custom item to the list. This is done by typing into the input field and selecting the custom item from the popover list.

Also provide the `itemAdditionHelpText` prop to describe this functionality to users.

```js
import { SingleSelect, Block } from 'suomifi-ui-components';

const countries = [
  {
    labelText: 'Switzerland',
    uniqueItemId: 'sw2435626'
  },
  {
    labelText: 'France',
    uniqueItemId: 'fr9823523'
  },
  {
    labelText: 'Spain',
    uniqueItemId: 'sp908293482'
  },
  {
    labelText: 'Bulgaria',
    uniqueItemId: 'bg82502335'
  },
  {
    labelText: 'Slovenia',
    uniqueItemId: 'sl9081231'
  },
  {
    labelText: 'Norway',
    uniqueItemId: 'no05111511'
  },
  {
    labelText: 'Germany',
    uniqueItemId: 'ge3451261'
  },
  {
    labelText: 'Finland',
    uniqueItemId: 'fi09282626'
  },
  {
    labelText: 'Poland',
    uniqueItemId: 'po6126266'
  }
];

<SingleSelect
  labelText="Country of residence"
  hintText="Select your current country of residence. You can filter options by typing in the field."
  clearButtonLabel="Clear selection"
  items={countries}
  visualPlaceholder="Choose country"
  noItemsText="No items"
  ariaOptionsAvailableTextFunction={(amount) =>
    amount === 1
      ? `${amount} option available`
      : `${amount} options available`
  }
  allowItemAddition
  itemAdditionHelpText="Add another country"
/>;
```

### Controlled state

Use the `selectedItem` prop to access and control selected items programmatically.

A typical use case involves setting the state in the `onItemSelectionChange()` function.

```js
import { SingleSelect } from 'suomifi-ui-components';
import { useState } from 'react';

const [selectedCountry, setSelectedCountry] = useState(null);

const countries = [
  {
    labelText: 'Switzerland',
    uniqueItemId: 'sw2435626'
  },
  {
    labelText: 'France',
    uniqueItemId: 'fr9823523'
  },
  {
    labelText: 'Spain',
    uniqueItemId: 'sp908293482'
  },
  {
    labelText: 'Bulgaria',
    uniqueItemId: 'bg82502335'
  },
  {
    labelText: 'Slovenia',
    uniqueItemId: 'sl9081231'
  },
  {
    labelText: 'Norway',
    uniqueItemId: 'no05111511'
  },
  {
    labelText: 'Germany',
    uniqueItemId: 'ge3451261'
  },
  {
    labelText: 'Finland',
    uniqueItemId: 'fi09282626'
  },
  {
    labelText: 'Poland',
    uniqueItemId: 'po6126266'
  }
];

<SingleSelect
  labelText="Country of residence"
  hintText="Select your current country of residence. You can filter options by typing in the field."
  clearButtonLabel="Clear selection"
  items={countries}
  visualPlaceholder="Choose country"
  noItemsText="No items"
  ariaOptionsAvailableTextFunction={(amount) =>
    amount === 1
      ? `${amount} option available`
      : `${amount} options available`
  }
  selectedItem={selectedCountry}
  onItemSelectionChange={(newItem) => setSelectedCountry(newItem)}
/>;
```

### Controlled state with custom option enabled

When selected items are controlled and `allowItemAddition` is enabled, you must have some logic outside the component to keep things running as expected. Below is an example.

```js
import { SingleSelect } from 'suomifi-ui-components';
import { useState } from 'react';
const [selectedCountry, setSelectedCountry] = useState(null);

const countries = [
  {
    labelText: 'Switzerland',
    uniqueItemId: 'sw2435626'
  },
  {
    labelText: 'France',
    uniqueItemId: 'fr9823523'
  },
  {
    labelText: 'Spain',
    uniqueItemId: 'sp908293482'
  },
  {
    labelText: 'Bulgaria',
    uniqueItemId: 'bg82502335'
  },
  {
    labelText: 'Slovenia',
    uniqueItemId: 'sl9081231'
  },
  {
    labelText: 'Norway',
    uniqueItemId: 'no05111511'
  },
  {
    labelText: 'Germany',
    uniqueItemId: 'ge3451261'
  },
  {
    labelText: 'Finland',
    uniqueItemId: 'fi09282626'
  },
  {
    labelText: 'Poland',
    uniqueItemId: 'po6126266'
  }
];

const [appendedCountries, setAppendedCountries] =
  React.useState(countries);

const handleSelection = (newSelectedItem) => {
  if (newSelectedItem !== null) {
    const countryIsNew = !countries.some(
      (country) =>
        country.uniqueItemId === newSelectedItem.uniqueItemId
    );
    if (countryIsNew) {
      setAppendedCountries(countries.concat([newSelectedItem]));
    } else {
      setAppendedCountries(countries);
    }
  } else {
    setAppendedCountries(countries);
  }
  setSelectedCountry(newSelectedItem);
};

<SingleSelect
  labelText="Country of residence"
  hintText="Select your current country of residence. You can filter options by typing in the field."
  clearButtonLabel="Clear selection"
  items={appendedCountries}
  visualPlaceholder="Choose country"
  noItemsText="No items"
  ariaOptionsAvailableTextFunction={(amount) =>
    amount === 1
      ? `${amount} option available`
      : `${amount} options available`
  }
  allowItemAddition
  itemAdditionHelpText="Add another country"
  selectedItem={selectedCountry}
  onItemSelectionChange={(item) => {
    handleSelection(item);
  }}
/>;
```

### Disabled

The entire component or individual items can be disabled.

```js
import { SingleSelect } from 'suomifi-ui-components';

const countries = [
  {
    labelText: 'Switzerland',
    uniqueItemId: 'sw2435626'
  },
  {
    labelText: 'France',
    uniqueItemId: 'fr9823523',
    disabled: true
  },
  {
    labelText: 'Spain',
    uniqueItemId: 'sp908293482'
  },
  {
    labelText: 'Bulgaria',
    uniqueItemId: 'bg82502335'
  },
  {
    labelText: 'Slovenia',
    uniqueItemId: 'sl9081231'
  },
  {
    labelText: 'Norway',
    uniqueItemId: 'no05111511'
  },
  {
    labelText: 'Germany',
    uniqueItemId: 'ge3451261',
    disabled: true
  },
  {
    labelText: 'Finland',
    uniqueItemId: 'fi09282626'
  },
  {
    labelText: 'Poland',
    uniqueItemId: 'po6126266'
  }
];

<>
  <SingleSelect
    labelText="Country of residence"
    hintText="Select your current country of residence. You can filter options by typing in the field."
    clearButtonLabel="Clear selection"
    items={countries}
    disabled
  />
  <SingleSelect
    labelText="Country of residence"
    hintText="Select your current country of residence. You can filter options by typing in the field."
    clearButtonLabel="Clear selection"
    items={countries}
    visualPlaceholder="Choose country"
    noItemsText="No items"
    ariaOptionsAvailableTextFunction={(amount) =>
      amount === 1
        ? `${amount} option available`
        : `${amount}options available`
    }
  />
</>;
```

### Loading indicator

The example below simulates a data fetch operation from a backend.

Use the `loading` and `loadingText` props to enable a loading spinner for SingleSelect. This can be done in the `onChangeWithoutDebounce()` function, which runs immediately when the user types into the filter text input.

The backend data fetch operation can be performed in the `onChange()` function, which uses a `debounce` time so that the request is made only after the user has stopped typing for a set amount of time.

```js
import { useState } from 'react';
import { SingleSelect } from 'suomifi-ui-components';

const [loading, setLoading] = useState(false);
const [countries, setCountries] = useState([]);
const [backendSimulationTimeout, setBackendSimulationTimeout] =
  useState(null);

const allCountries = [
  {
    labelText: 'Switzerland',
    uniqueItemId: 'sw2435626'
  },
  {
    labelText: 'France',
    uniqueItemId: 'fr9823523'
  },
  {
    labelText: 'Spain',
    uniqueItemId: 'sp908293482'
  },
  {
    labelText: 'Bulgaria',
    uniqueItemId: 'bg82502335'
  },
  {
    labelText: 'Slovenia',
    uniqueItemId: 'sl9081231'
  },
  {
    labelText: 'Norway',
    uniqueItemId: 'no05111511'
  },
  {
    labelText: 'Germany',
    uniqueItemId: 'ge3451261'
  },
  {
    labelText: 'Finland',
    uniqueItemId: 'fi09282626'
  },
  {
    labelText: 'Poland',
    uniqueItemId: 'po6126266'
  }
];

const simulateBackendCall = (searchStr) => {
  setCountries([]);
  if (backendSimulationTimeout) {
    clearTimeout(backendSimulationTimeout);
  }
  const backendSimulationTimeoutScoped = setTimeout(() => {
    const matchingCountries = allCountries.filter((c) =>
      c.labelText.toLowerCase().includes(searchStr.toLowerCase())
    );
    setCountries(matchingCountries);
    setLoading(false);
    setBackendSimulationTimeout(null);
  }, 1000);
  setBackendSimulationTimeout(backendSimulationTimeoutScoped);
};

<SingleSelect
  labelText="Country of residence"
  hintText="Select your current country of residence. You can filter options by typing in the field."
  clearButtonLabel="Clear selection"
  items={countries}
  visualPlaceholder="Choose country"
  noItemsText="No items"
  ariaOptionsAvailableTextFunction={(amount) =>
    amount === 1
      ? `${amount} option available`
      : `${amount} options available`
  }
  debounce={1000}
  loading={loading}
  loadingText="Loading data"
  onChange={simulateBackendCall}
  onChangeWithoutDebounce={() => {
    if (!loading) {
      setLoading(true);
    }
  }}
/>;
```

### Full width

You can make the component span the entire width of its parent via the `fullWidth` prop.

```js
import { SingleSelect } from 'suomifi-ui-components';

const countries = [
  {
    labelText: 'Switzerland',
    uniqueItemId: 'sw2435626'
  },
  {
    labelText: 'France',
    uniqueItemId: 'fr9823523'
  },
  {
    labelText: 'Spain',
    uniqueItemId: 'sp908293482'
  },
  {
    labelText: 'Bulgaria',
    uniqueItemId: 'bg82502335'
  },
  {
    labelText: 'Slovenia',
    uniqueItemId: 'sl9081231'
  },
  {
    labelText: 'Norway',
    uniqueItemId: 'no05111511'
  },
  {
    labelText: 'Germany',
    uniqueItemId: 'ge3451261'
  },
  {
    labelText: 'Finland',
    uniqueItemId: 'fi09282626'
  },
  {
    labelText: 'Poland',
    uniqueItemId: 'po6126266'
  }
];

<SingleSelect
  labelText="Country of residence"
  hintText="Select your current country of residence. You can filter options by typing in the field."
  clearButtonLabel="Clear selection"
  items={countries}
  visualPlaceholder="Choose country"
  noItemsText="No items"
  ariaOptionsAvailableTextFunction={(amount) =>
    amount === 1
      ? `${amount} option available`
      : `${amount} options available`
  }
  fullWidth
/>;
```

### Tooltip

A `<Tooltip>` component can be used with SingleSelect to provide additional information.

In terms of instructive texts, Tooltip should only be used as a "last resort" when the info text is too long for `hintText`. Tooltip can be used for other nice-to-know information.

For instructions regarding how to ensure your Tooltip is accessible, please refer to the [Tooltip documentation](./#/Components/Tooltip).

```js
import {
  SingleSelect,
  Tooltip,
  Heading,
  Text
} from 'suomifi-ui-components';

const countries = [
  {
    labelText: 'Switzerland',
    uniqueItemId: 'sw2435626'
  },
  {
    labelText: 'France',
    uniqueItemId: 'fr9823523'
  },
  {
    labelText: 'Spain',
    uniqueItemId: 'sp908293482'
  },
  {
    labelText: 'Bulgaria',
    uniqueItemId: 'bg82502335'
  },
  {
    labelText: 'Slovenia',
    uniqueItemId: 'sl9081231'
  },
  {
    labelText: 'Norway',
    uniqueItemId: 'no05111511'
  },
  {
    labelText: 'Germany',
    uniqueItemId: 'ge3451261'
  },
  {
    labelText: 'Finland',
    uniqueItemId: 'fi09282626'
  },
  {
    labelText: 'Poland',
    uniqueItemId: 'po6126266'
  }
];

const labelText = 'Country of residence';

<SingleSelect
  labelText={labelText}
  hintText="Select your current country of residence. You can filter options by typing in the field."
  clearButtonLabel="Clear selection"
  items={countries}
  visualPlaceholder="Choose country"
  noItemsText="No items"
  ariaOptionsAvailableTextFunction={(amount) =>
    amount === 1
      ? `${amount} option available`
      : `${amount} options available`
  }
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
/>;
```

### Props & methods

SingleSelect component supports [margin props](./#/Spacing/Margin%20props) for spacing.
