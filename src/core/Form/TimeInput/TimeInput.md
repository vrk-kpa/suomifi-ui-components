The `<TimeInput>` component is used to input times. It looks and behaves similarly to a regular `<TextInput>` but has the following autocomplete features on input blur:

- If the user types 1 or 2 characters which are valid hours (0-24), the time will be autocompleted. A leading zero will also be removed.
  - E.g. 14 --> 14.00
  - E.g. 09 --> 9.00 and 9 --> 9.00
- If the user types 4 characters which form a valid "military time" value, the dot `.` character will be added as a separator.
  - E.g. 1400 --> 14.00 and 1745 --> 17.45
- If the user types the colon `:` character it will be replaced with the dot `.` character. Dot is the correct time separator character in the Finnish language.

--

TimeInput is typically used together with [DateInput](/#/Components/DateInput).

If only certain intervals are allowed as the time value (e.g. every half hour) consider using the [Dropdown](/#/Components/Dropdown) or [SingleSelect](/#/Components/SingleSelect) components instead.

Examples:

- [Basic use](./#/Components/TimeInput?id=basic-use)
- [Hint text](./#/Components/TimeInput?id=hint-text)
- [Default value](./#/Components/TimeInput?id=default-value)

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

The value must be of format H.mm

```jsx
import { TimeInput } from 'suomifi-ui-components';

<TimeInput
  labelText="Open from"
  hintText="Daily opening time of your business. Use format H.mm"
  defaultValue="12.30"
/>;
```

### Validation

### Props & methods
