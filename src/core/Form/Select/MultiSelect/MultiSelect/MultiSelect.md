The `<MultiSelect>` component is used to select multiple items from a list of options. The list can also be filtered by typing.

If you need to select only one option, use the [SingleSelect](./#/Components/SingleSelect) component instead.

Examples:

- [Basic use](./#/Components/MultiSelect?id=basic-use)
- [Default selected items](./#/Components/MultiSelect?id=default-selected-items)
- [Error status](./#/Components/MultiSelect?id=error-status)
- [Allowing users to add their own items](./#/Components/MultiSelect?id=allowing-users-to-add-their-own-items)
- [Controlled state](./#/Components/MultiSelect?id=controlled-state)
- [Controlled state with custom options enabled](./#/Components/MultiSelect?id=controlled-state-with-custom-options-enabled)
- [Disabled](./#/Components/MultiSelect?id=disabled)
- [Formatting accessibility texts](./#/Components/MultiSelect?id=formatting-accessibility-texts)
- [Loading indicator](./#/Components/MultiSelect?id=loading-indicator)
- [Tooltip](./#/Components/MultiSelect?id=tooltip)

<div style="margin-bottom: 40px">
  [Props & methods](./#/Components/MultiSelect?id=props--methods)
</div>

### Basic use

- Provide a descriptive `labelText` for the component
- Each object in the `items` list must contain their own visible `labelText` and a `uniqueItemId`
- Provide such a `hintText` that it is apparent users can choose multiple items
- Use `chipListVisible` to enable Chips which represent the selected values under the input
- If `removeAllButtonLabel` is providen, a button to remove all selections is shown under the input
- The `visualPlaceholder` prop is used to apply a placeholder text to the input. For accessibility reasons, do not use placeholders for instructions
- The `noItemsText` is shown when the user filters the list in a way that does not produce any results
- Provide the following accessibility related props:
  - `ariaSelectedAmountText` which is read by screen readers when you select an item (preceded by the amount of currently selected items)
  - `ariaOptionsAvailableText` which is read by screen readers when the user filters the list by typing (preceded by the amount of items matching the filter)
  - `ariaOptionChipRemovedText` which is read by screen readers when an item is deselected
  - `ariaChipActionLabel` which tells screen reader users the purpose of the Chips

```js
import { MultiSelect } from 'suomifi-ui-components';

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

<MultiSelect
  labelText="Visited countries"
  hintText="Select all countries you have visited during the past year. You can filter options by typing in the field"
  items={countries}
  chipListVisible
  ariaChipActionLabel="Deselect"
  removeAllButtonLabel="Remove all selections"
  visualPlaceholder="Choose countries"
  noItemsText="No items"
  ariaSelectedAmountText="countries selected"
  ariaOptionsAvailableText="options available"
  ariaOptionChipRemovedText="removed"
/>;
```

### Default selected items

Set initial selections using the `defaultSelectedItems` prop. An object in that array must match an object in the `items` array.

```js
import { MultiSelect } from 'suomifi-ui-components';

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

const defaultSelections = [
  {
    labelText: 'Bulgaria',
    uniqueItemId: 'bg82502335'
  },
  {
    labelText: 'Germany',
    uniqueItemId: 'ge3451261'
  }
];

<MultiSelect
  labelText="Visited countries"
  hintText="Select all countries you have visited during the past year. You can filter options by typing in the field"
  items={countries}
  defaultSelectedItems={defaultSelections}
  chipListVisible
  ariaChipActionLabel="Deselect"
  removeAllButtonLabel="Remove all selections"
  visualPlaceholder="Choose countries"
  noItemsText="No items"
  ariaSelectedAmountText="countries selected"
  ariaOptionsAvailableText="options available"
  ariaOptionChipRemovedText="removed"
/>;
```

### Error status

Control the error status of the component using the `status` and `statusText` props.

```js
import { MultiSelect } from 'suomifi-ui-components';
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

<MultiSelect
  labelText="Visited countries"
  hintText="Select all countries you have visited during the past year. You can filter options by typing in the field"
  items={countries}
  chipListVisible
  ariaChipActionLabel="Deselect"
  removeAllButtonLabel="Remove all selections"
  visualPlaceholder="Choose countries"
  noItemsText="No items"
  ariaSelectedAmountText="countries selected"
  ariaOptionsAvailableText="options available"
  ariaOptionChipRemovedText="removed"
  status={error ? 'error' : 'default'}
  statusText={error ? 'This field is required' : ''}
  onItemSelectionsChange={(newItems) =>
    newItems.length === 0 ? setError(true) : setError(false)
  }
/>;
```

### Allowing users to add their own items

Apply the `allowItemAddition` prop to enable functionality which allows users to add a custom item to the list. This is done by typing into the input field and selecting the custom item from the popover list.

Also provide the `itemAdditionHelpText` prop to describe this functionality to users.

```js
import { MultiSelect, Block } from 'suomifi-ui-components';

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

<MultiSelect
  labelText="Visited countries"
  hintText="Select all countries you have visited during the past year. You can filter options by typing in the field and add countries yourself if they are not already available in the list."
  items={countries}
  chipListVisible
  ariaChipActionLabel="Deselect"
  removeAllButtonLabel="Remove all selections"
  visualPlaceholder="Choose countries"
  noItemsText="No items"
  ariaSelectedAmountText="countries selected"
  ariaOptionsAvailableText="options available"
  ariaOptionChipRemovedText="removed"
  allowItemAddition
  itemAdditionHelpText="Add another country"
/>;
```

### Controlled state

Use the `selectedItems` prop to access and control selected items programmatically.

A typical use case involves setting the state in the `onItemSelectionsChange()` function.

```js
import { MultiSelect } from 'suomifi-ui-components';
import { useState } from 'react';

const [selectedCountries, setSelectedCountries] = useState([]);

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

<MultiSelect
  labelText="Visited countries"
  hintText="Select all countries you have visited during the past year. You can filter options by typing in the field."
  items={countries}
  selectedItems={selectedCountries}
  chipListVisible
  ariaChipActionLabel="Deselect"
  removeAllButtonLabel="Remove all selections"
  visualPlaceholder="Choose countries"
  noItemsText="No items"
  ariaSelectedAmountText="countries selected"
  ariaOptionsAvailableText="options available"
  ariaOptionChipRemovedText="removed"
  onItemSelectionsChange={(newSelectedItems) =>
    setSelectedCountries(newSelectedItems)
  }
/>;
```

### Controlled state with custom options enabled

When selected items are controlled and `allowItemAddition` is enabled, you must have some logic outside the component to keep things running as expected. Below is an example.

```js
import { MultiSelect } from 'suomifi-ui-components';
import { useState } from 'react';
const [selectedCountries, setSelectedCountries] = useState([]);

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

const handleSelection = (newSelectedItems) => {
  const userAddedCountries = newSelectedItems.filter((nsi) =>
    countries.every(
      (country) => country.uniqueItemId !== nsi.uniqueItemId
    )
  );
  setAppendedCountries(countries.concat(userAddedCountries));
  setSelectedCountries(newSelectedItems);
};

<MultiSelect
  labelText="Visited countries"
  hintText="Select all countries you have visited during the past year. You can filter options by typing in the field."
  items={appendedCountries}
  selectedItems={selectedCountries}
  chipListVisible
  ariaChipActionLabel="Deselect"
  removeAllButtonLabel="Remove all selections"
  visualPlaceholder="Choose countries"
  noItemsText="No items"
  ariaSelectedAmountText="countries selected"
  ariaOptionsAvailableText="options available"
  ariaOptionChipRemovedText="removed"
  allowItemAddition
  itemAdditionHelpText="Add another country"
  onItemSelectionsChange={(newSelectedItems) =>
    handleSelection(newSelectedItems)
  }
/>;
```

### Disabled

The entire component or individual items can be disabled.

Initially selected items can also be disabled, preventing users from deselecting them.

```js
import { MultiSelect } from 'suomifi-ui-components';

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

const defaultSelections = [
  {
    labelText: 'Bulgaria',
    uniqueItemId: 'bg82502335'
  },
  {
    labelText: 'Germany',
    uniqueItemId: 'ge3451261',
    disabled: true
  }
];

<>
  <MultiSelect
    labelText="Visited countries"
    hintText="Select all countries you have visited during the past year. You can filter options by typing in the field"
    items={countries}
    disabled
  />
  <MultiSelect
    labelText="Visited countries"
    hintText="Select all countries you have visited during the past year. You can filter options by typing in the field"
    items={countries}
    defaultSelectedItems={defaultSelections}
    chipListVisible
    ariaChipActionLabel="Deselect"
    removeAllButtonLabel="Remove all selections"
    visualPlaceholder="Choose countries"
    noItemsText="No items"
    ariaSelectedAmountText="countries selected"
    ariaOptionsAvailableText="options available"
    ariaOptionChipRemovedText="removed"
  />
</>;
```

### Formatting accessibility texts

The `ariaOptionsAvailableTextFunction()`, `ariaOptionChipRemovedTextFunction()` and `ariaSelectedAmountTextFunction()` props allow for more granular control of the accessibility related texts.

```js
import { MultiSelect } from 'suomifi-ui-components';

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

<MultiSelect
  labelText="Visited countries"
  hintText="Select all countries you have visited during the past year. You can filter options by typing in the field"
  items={countries}
  chipListVisible
  ariaChipActionLabel="Deselect"
  removeAllButtonLabel="Remove all selections"
  visualPlaceholder="Choose countries"
  noItemsText="No items"
  ariaOptionsAvailableTextFunction={(length) =>
    `there are ${length} options matching your filter`
  }
  ariaOptionChipRemovedTextFunction={(option) =>
    `deselected ${option}`
  }
  ariaSelectedAmountTextFunction={(amount) =>
    amount === 1
      ? `${amount} country selected`
      : `${amount} countries selected`
  }
/>;
```

### Loading indicator

The example below simulates a data fetch operation from a backend.

Use the `loading` and `loadingText` props to enable a loading spinner. This can be done in the `onChange()` function, which runs when the user types into the filter text input.

```js
import { useState } from 'react';
import { MultiSelect } from 'suomifi-ui-components';

const [loading, setLoading] = useState(false);
const [countries, setCountries] = useState([]);
const countriesFromBackend = [
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

const runLoader = () => {
  let progress = 0;
  setLoading(true);
  setCountries([]);
  const id = setInterval(frame, 100);
  function frame() {
    if (progress >= 10) {
      clearInterval(id);
      setCountries(countriesFromBackend);
      setLoading(false);
      progress = 0;
    } else {
      progress = progress + 1;
    }
  }
};

const startup = (event) => {
  if (!loading) {
    runLoader();
  }
};

<MultiSelect
  labelText="Visited countries"
  hintText="Select all countries you have visited during the past year. You can filter options by typing in the field"
  items={countries}
  chipListVisible
  ariaChipActionLabel="Deselect"
  removeAllButtonLabel="Remove all selections"
  visualPlaceholder="Choose countries"
  noItemsText="No items"
  ariaSelectedAmountText="countries selected"
  ariaOptionsAvailableText="options available"
  ariaOptionChipRemovedText="removed"
  loading={loading}
  loadingText="Loading data"
  onChange={startup}
/>;
```

### Tooltip

A `<Tooltip>` component can be used with MultiSelect to provide additional information.

In terms of instructive texts, Tooltip should only be used as a "last resort" when the info text is too long for `hintText`. Tooltip can be used for other nice-to-know information.

For instructions regarding how to ensure your Tooltip is accessible, please refer to the [Tooltip documentation](./#/Components/Tooltip).

```js
import {
  MultiSelect,
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

const labelText = 'Visited countries';

<MultiSelect
  labelText={labelText}
  hintText="Select all countries you have visited during the past year. You can filter options by typing in the field"
  items={countries}
  chipListVisible
  ariaChipActionLabel="Deselect"
  removeAllButtonLabel="Remove all selections"
  visualPlaceholder="Choose countries"
  noItemsText="No items"
  ariaSelectedAmountText="countries selected"
  ariaOptionsAvailableText="options available"
  ariaOptionChipRemovedText="removed"
  tooltipComponent={
    <Tooltip
      ariaToggleButtonLabelText={`${labelText}, show additional information`}
      ariaCloseButtonLabelText={`${labelText}, close additional information`}
    >
      <Heading variant="h5" as="h2">
        Why you are being asked this information
      </Heading>
      <Text>
        We have deals in place with some of our partner countries to
        provide you personalized service
      </Text>
    </Tooltip>
  }
/>;
```

### Props & methods

MultiSelect component supports [margin props](./#/Spacing/Margin%20props) for spacing.
