The `<TimeInput>` component is used to input times. It consists of two inputs (hours and minutes) which are labelled and visually presented together as one input.

TimeInput is typically used together with [DateInput](/#/Components/DateInput).

If only certain intervals are allowed as the time value (e.g. every half hour) consider using the [Dropdown](/#/Components/Dropdown) or [SingleSelect](/#/Components/SingleSelect) components instead.

### Basic use

Provide a descriptive `labelText` for the input.

Also provide the `ariaLabelHours` and `ariaLabelMinutes` props for the individual inputs to give better context for screen reader users.

```jsx
import { TimeInput } from 'suomifi-ui-components';

<TimeInput
  labelText="Open from"
  ariaLabelHours="hours"
  ariaLabelMinutes="minutes"
/>;
```

### Hint text

Use the `hinText` prop to provide instructions regarding the input.

```jsx
import { TimeInput } from 'suomifi-ui-components';

<TimeInput
  labelText="Open from"
  ariaLabelHours="hours"
  ariaLabelMinutes="minutes"
  hintText="Opening time of your business"
/>;
```

### Validation

### Props & methods
