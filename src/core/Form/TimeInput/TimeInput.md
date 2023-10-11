The `<TimeInput>` component is used to input times. It looks and behaves similarly to a regular `<TextInput>` but has the following autocomplete features **on input blur**:

- 1 or 2 characters which are valid hours (0-24) will be autocompleted to full time. A leading zero will also be removed.
  - 14 --> 14.00
  - 09 --> 9.00
  - 9 --> 9.00
- 4 characters which form a valid "military time" will be autocompleted to full time
  - 1745 --> 17.45
  - 0200 --> 2.00
- Leading zero will be removed from hours
  - 07.45 --> 7.45
- The colon `:` character it will be replaced with the dot `.` character. Dot is the correct time separator character in the Finnish language.

TimeInput is typically used together with [DateInput](/#/Components/DateInput).

If only certain intervals are allowed as the time value (e.g. every half hour) consider using the [Dropdown](/#/Components/Dropdown) or [SingleSelect](/#/Components/SingleSelect) components instead.

Examples:

- [Basic use](./#/Components/TimeInput?id=basic-use)
- [Hint text](./#/Components/TimeInput?id=hint-text)
- [Default value](./#/Components/TimeInput?id=default-value)
- [Controlled value](./#/Components/TimeInput?id=controlled-value)
- [Controlled value with autocompletion](./#/Components/TimeInput?id=controlled-value-with-autocompletion)
- [Error status and validation](./#/Components/TimeInput?id=error-status-and-validation)
- [Optional input](./#/Components/TimeInput?id=optional-input)
- [Disabled](./#/Components/TimeInput?id=disabled)
- [Hidden label](./#/Components/TimeInput?id=hidden-label)
- [Debounce](./#/Components/TimeInput?id=debounce)
- [Tooltip](./#/Components/TimeInput?id=tooltip)

<div style="margin-bottom: 40px">
  [Props & methods](./#/Components/TimeInput?id=props--methods)
</div>

### Basic use

Provide a descriptive `labelText` for the input.

```jsx
import { TimeInpu, TextInput } from 'suomifi-ui-components';

<TimeInput labelText="Opening time" />;
```

### Hint text

Use the `hinText` prop to provide instructions regarding the input.

```jsx
import { TimeInput } from 'suomifi-ui-components';

<TimeInput
  labelText="Opening time"
  hintText="Daily opening time of your business. Use format H.mm"
/>;
```

### Default value

Use the `defaultValue` prop to provide an initial value for the input.

```jsx
import { TimeInput } from 'suomifi-ui-components';

<TimeInput
  labelText="Open from"
  hintText="Daily opening time of your business. Use format H.mm"
  defaultValue="12.30"
/>;
```

### Controlled value

Use the `value` prop to programmatically access and control the component's value.

A typical use case involves setting the state in the `onChange()` function.

```jsx
import { TimeInput } from 'suomifi-ui-components';
import { useState } from 'react';

const [controlledValue, setControlledValue] = useState();

<TimeInput
  labelText="Open from"
  hintText="Daily opening time of your business. Use format H.mm"
  value={controlledValue}
  onChange={(newVal) => setControlledValue(newVal)}
/>;
```

### Controlled value with autocompletion

When the input value is controlled, you can use the bundled `autocompleteTimeString()` function to apply the autocomplete functionalities (described at the top of this page) manually.

`autocompleteTimeString()` returns the autocompleted string if such completions can be performed and `null` otherwise.

```jsx
import {
  TimeInput,
  autocompleteTimeString
} from 'suomifi-ui-components';
import { useState } from 'react';

const [controlledValue, setControlledValue] = useState();

<TimeInput
  labelText="Open from"
  hintText="Daily opening time of your business. Use format H.mm"
  value={controlledValue}
  onChange={(newVal) => setControlledValue(newVal)}
  onBlur={() => {
    const adjustedValue = autocompleteTimeString(controlledValue);
    if (adjustedValue) {
      setControlledValue(adjustedValue);
    }
  }}
/>;
```

### Error status and validation

As described at the top of this page, `<TimeInput>` automatically fills in or corrects some user inputs on blur event. It does not, however, contain any internal logic to validate inputs or display error messages. Thus, validation has to be implemented externally as shown in the example below.

Due to the component's autocomplete features, it is recommended to run validation either on blur or on form submit (as opposed to dynamically on change).

```jsx
import { TimeInput } from 'suomifi-ui-components';
import { useState } from 'react';

const [errorState, setErrorState] = React.useState(false);
const statusText = errorState ? 'Invalid time' : undefined;
const status = errorState ? 'error' : 'default';

// String is of type H.mm where H is 0-24 and mm is 0-59
const isValidTimeString = (timeStr) => {
  console.log(timeStr);
  if (timeStr.match(/^\d{1,2}.\d{2}$/)) {
    const parts = timeStr.split('.');
    const hours = parseInt(parts[0]);
    const minutes = parseInt(parts[1]);
    if (hours >= 0 && hours < 25 && minutes >= 0 && minutes < 60) {
      return true;
    }
  }
  return false;
};

<TimeInput
  labelText="Open from"
  hintText="Daily opening time of your business. Use format H.mm"
  statusText={statusText}
  status={status}
  onBlur={(inputVal) => setErrorState(!isValidTimeString(inputVal))}
/>;
```

### Optional input

Suomi.fi inputs are required by default, but can be marked optional using the `optionalText` property.

```jsx
import { TimeInput } from 'suomifi-ui-components';

<TimeInput
  labelText="Opening time"
  hintText="Daily opening time of your business. Use format H.mm"
  optionalText="optional"
/>;
```

### Disabled

Disable the input with the `disabled` prop.

```jsx
import { TimeInput } from 'suomifi-ui-components';

<TimeInput labelText="Opening time" disabled />;
```

### Hidden label

In some special cases, the label can be hidden from sighted users. This is not recommended though, and should only be done when the field already has another visually connected label. In these cases, labelText should match or include the visual label.

```jsx
import { TimeInput } from 'suomifi-ui-components';

<TimeInput labelText="Opening time" labelMode="hidden" />;
```

### Debounce

You can provide the input a `debounce` time so that the `onChange()` function only runs after the user stops typing.

NOTE: Like shown previously on this page ([Error status and validation](./#/Components/TimeInput?id=error-status-and-validation)), it is not recommended to validate this component's value dynamically using `onChange()` due to the internal autocomplete features

```jsx
import { TimeInput } from 'suomifi-ui-components';

<TimeInput
  labelText="Opening time"
  debounce={300}
  onChange={(newValue) => console.log(newValue)}
/>;
```

### Tooltip

A `<Tooltip>` component can be used with TimeInput to provide additional information.

In terms of instructive texts, Tooltip should only be used as a "last resort" when the info text is too long for `hintText`. Tooltip can be used for other nice-to-know information.

For instructions regarding how to ensure your Tooltip is accessible, please refer to the [Tooltip documentation](./#/Components/Tooltip).

```js
import {
  TimeInput,
  Tooltip,
  Heading,
  Text
} from 'suomifi-ui-components';

const labelTextForTooltipExample = 'Opening time';

<TimeInput
  labelText={labelTextForTooltipExample}
  hintText="Daily opening time of your business. Use format H.mm"
  tooltipComponent={
    <Tooltip
      ariaToggleButtonLabelText={`${labelTextForTooltipExample}, additional information`}
      ariaCloseButtonLabelText={`${labelTextForTooltipExample}, close additional information`}
    >
      <Heading variant="h5" as="h2">
        About opening times
      </Heading>
      <Text>
        Please provide a general opening time of your business for
        most days. This information will be used to lorem ipsum dolor
        sit amet.
      </Text>
    </Tooltip>
  }
/>;
```

### Props & methods

TimeInput component supports [margin props](./#/Spacing/Margin%20props) for spacing.
