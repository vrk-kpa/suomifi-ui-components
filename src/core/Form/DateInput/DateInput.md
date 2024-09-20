`<DateInput>` is used to input dates. Additionally, you can use the date picker calendar to allow users to select the date.

Examples:

- [Basic use](./#/Components/DateInput?id=basic-use)
- [Default value](./#/Components/DateInput?id=default-value)
- [Controlled value](./#/Components/DateInput?id=controlled-value)
- [Date picker](./#/Components/DateInput?id=date-picker)
- [Date picker position](./#/Components/DateInput?id=date-picker-position)
- [MinDate & maxDate](./#/Components/DateInput?id=mindate--maxdate)
- [Validation](./#/Components/DateInput?id=validation)
- [Initial focused date in date picker](./#/Components/DateInput?id=initial-focused-date-in-date-picker)
- [Disabled dates in date picker](./#/Components/DateInput?id=disabled-dates-in-date-picker)
- [Custom dateAdapter](./#/Components/DateInput?id=custom-dateadapter)
- [Custom texts for date picker](./#/Components/DateInput?id=custom-texts-for-date-picker)
- [Accessing value with ref](./#/Components/DateInput?id=accessing-value-with-ref)
- [Small screen date picker](./#/Components/DateInput?id=small-screen-date-picker)
- [Hidden label](./#/Components/DateInput?id=hidden-label)
- [Full width and fixed width](./#/Components/DateInput?id=full-width-and-fixed-width)
- [Optional input](./#/Components/DateInput?id=optional-input)
- [Tooltip](./#/Components/DateInput?id=tooltip)

<div style="margin-bottom: 40px">
  [Props & methods](./#/Components/DateInput?id=props--methods)
</div>

### Basic use

Always use a `labelText` to label the input.

You must also provide formatting instructions to the user. The recommended way to do this is to use `hintText`.

The `visualPlaceholder` prop is used to apply a placeholder text to the input. For accessibility reasons, do not use placeholders for instructions.

```js
import { DateInput } from 'suomifi-ui-components';

<DateInput
  labelText="Beginning date"
  hintText="Use format D.M.YYYY"
  visualPlaceholder="Beginning date"
/>;
```

### Default value

Default value for the input can be set with the `defaultValue` prop.

Note that the value is providen as a string.

```js
import { DateInput } from 'suomifi-ui-components';

<DateInput
  labelText="Beginning date"
  hintText="Use format D.M.YYYY"
  defaultValue="1.1.2023"
/>;
```

### Controlled value

Use the `value` prop to access and control the input's value programmatically.

A typical use case involves setting the input's value manually in the `onChange()` function.

```js
import { DateInput } from 'suomifi-ui-components';
import { useState } from 'react';

const [controlledValue, setControlledValue] = useState('');

<DateInput
  labelText="Beginning date"
  hintText="Use format D.M.YYYY"
  value={controlledValue}
  onChange={({ value, date }) => setControlledValue(value)}
/>;
```

### Date picker

Use the `datePickerEnabled` prop to enable the date picker calendar.

You can set the language of the calendar with the `language` prop. Finnish (fi), Swedish (sv) and English (en) are available.

```js
import { DateInput } from 'suomifi-ui-components';

<DateInput
  labelText="Beginning date"
  hintText="Use format D.M.YYYY"
  language="en"
  datePickerEnabled
/>;
```

### Date picker position

Use `datePickerPosition` prop to change the position of the date picker popover in relation to the calendar button. The date picker will also automatically adjust its position, both vertically and horizontally, based on available space. The possible values are `left`, `right` and `center` with `left` being the default.

```js
import { DateInput } from 'suomifi-ui-components';

<DateInput
  labelText="Beginning date"
  hintText="Use format D.M.YYYY"
  datePickerEnabled
  datePickerPosition="center"
/>;
```

### MinDate & maxDate

Use the `minDate` and `maxDate` props to control the available dates in the date picker calendar.

```js
import { DateInput } from 'suomifi-ui-components';

const minDate = new Date(2023, 1, 2);
const maxDate = new Date(2024, 11, 31);

<DateInput
  labelText="Beginning date"
  hintText="Use format D.M.YYYY"
  language="en"
  datePickerEnabled
  minDate={minDate}
  maxDate={maxDate}
/>;
```

### Validation

- Use the `onChange()` function to run validation logic and set the `status` and `statusText` props accordingly.
- `date-fns` is a internal dependency of `suomifi-ui-components` so you can import it for your validations.
- You can use the `debounce` prop to only run the validation when the user stops typing.

```js
import { DateInput } from 'suomifi-ui-components';
import { isWithinInterval } from 'date-fns';
import { useState } from 'react';

const minDate = new Date(2023, 1, 2);
const maxDate = new Date(2024, 11, 31);
const [statusText, setStatusText] = React.useState('');
const [status, setStatus] = React.useState('default');
const validate = ({ value, date }) => {
  if (value === '') {
    setStatusText('');
    setStatus('default');
  } else if (Number.isNaN(date.valueOf())) {
    setStatusText('Invalid date format');
    setStatus('error');
  } else if (
    !isWithinInterval(date, { start: minDate, end: maxDate })
  ) {
    setStatusText('Date is not in range');
    setStatus('error');
  } else if (
    isWithinInterval(date, { start: minDate, end: maxDate })
  ) {
    setStatusText('');
    setStatus('default');
  }
};

<DateInput
  labelText="Beginning date"
  hintText="Use format D.M.YYYY"
  language="en"
  datePickerEnabled
  minDate={minDate}
  maxDate={maxDate}
  onChange={validate}
  debounce={300}
  status={status}
  statusText={statusText}
/>;
```

### Initial focused date in date picker

You can use the `initialDate` prop to control which date gets focused when the date picker opens.

```js
import { DateInput } from 'suomifi-ui-components';

<DateInput
  labelText="Beginning date"
  hintText="Use format D.M.YYYY"
  language="en"
  datePickerEnabled
  initialDate={new Date(2023, 0, 1)}
/>;
```

### Disabled dates in date picker

Use the `shouldDisableDate()` prop to disable certain dates from the date picker. Disabled dates can still be accessed through keyboard navigation but they are not selectable.

```js
import { DateInput } from 'suomifi-ui-components';
import { isWeekend } from 'date-fns';

<DateInput
  labelText="Beginning date"
  hintText="Use format D.M.YYYY"
  language="en"
  datePickerEnabled
  shouldDisableDate={(date) => isWeekend(date)}
/>;
```

### Custom dateAdapter

The `dateAdapter` prop enables custom formatting and parsing for the date selected with the date picker calendar.

```js
import { DateInput } from 'suomifi-ui-components';
import { format, parse } from 'date-fns';

const customDateAdapter = {
  format: (date) => format(date, 'y-M-d'),
  parse: (value) => parse(value, 'y-M-d', new Date())
};

<DateInput
  labelText="Beginning date"
  hintText="Use format YYYY-M-D"
  language="en"
  datePickerEnabled
  dateAdapter={customDateAdapter}
/>;
```

### Custom texts for date picker

If you need to customize the texts in the date picker calendar, use the `datePickerTexts` prop.

For a full list of customisable text options, refer to <a href="./#/Components/DateInput?id=props--methods">props & methods</a>

```js
import { DateInput } from 'suomifi-ui-components';

<DateInput
  labelText="Beginning date"
  hintText="Use format D.M.YYYY"
  language="en"
  datePickerEnabled
  datePickerTexts={{
    weekDayAbbreviations: [
      'Mon.',
      'Tue.',
      'Wed.',
      'Thu.',
      'Fri.',
      'Sat.',
      'Sun.'
    ]
  }}
/>;
```

### Accessing value with ref

The value of a DateInput can be accessed using React ref.

```js
import { DateInput } from 'suomifi-ui-components';
import { useRef } from 'react';

const dateInputRef = useRef();

<DateInput
  labelText="Beginning date"
  hintText="Use format D.M.YYYY"
  ref={dateInputRef}
  onChange={() => console.log(dateInputRef.current.value)}
/>;
```

### Small screen date picker

Use the `smallScreen` prop to enable a version of the date picker which is designed for narrower screens.

```js
import { DateInput } from 'suomifi-ui-components';

<DateInput
  labelText="Beginning date"
  hintText="Use format D.M.YYYY"
  language="en"
  datePickerEnabled
  smallScreen
/>;
```

### Hidden label

Label can be visually hidden with the `labelMode="hidden"` prop.

```js
import { DateInput } from 'suomifi-ui-components';
import React from 'react';

<DateInput
  onBlur={(event) => console.log(event.target.value)}
  labelText="Beginning date"
  labelMode="hidden"
/>;
```

### Full width and fixed width

You can use the `fullWidth` prop to make the input take all available horizontal space.

You can use the `style` property to set inline styles for the input.

```js
import { DateInput, Button } from 'suomifi-ui-components';
<>
  <DateInput
    labelText="Beginning date"
    hintText="Use format D.M.YYYY"
    language="en"
    datePickerEnabled
    fullWidth
  />

  <DateInput
    labelText="Beginning date"
    hintText="Use format D.M.YYYY"
    datePickerEnabled
    language="en"
    style={{ width: '200px' }}
  />
</>;
```

### Optional input

Suomi.fi inputs are required by default, but can be marked optional using the `optionalText` property.

```js
import { DateInput } from 'suomifi-ui-components';

<DateInput
  labelText="Beginning date"
  hintText="Use format D.M.YYYY"
  optionalText="optional"
  fullWidth
/>;
```

### Tooltip

A `<Tooltip>` component can be used with DateInput to provide additional information.

Do not use Tooltip for formatting instructions. Tooltip can be used for other nice-to-know information.

For instructions regarding how to ensure your Tooltip is accessible, please refer to the [Tooltip documentation](./#/Components/Tooltip).

```js
import {
  DateInput,
  Tooltip,
  Heading,
  Text
} from 'suomifi-ui-components';

const labelText = 'Beginning date';

<DateInput
  labelText={labelText}
  hintText="Use format D.M.YYYY"
  datePickerEnabled
  language="en"
  tooltipComponent={
    <Tooltip
      ariaToggleButtonLabelText={`${labelText}, show additional information`}
      ariaCloseButtonLabelText={`${labelText}, close additional information`}
    >
      <Heading variant="h5" as="h2">
        What happens on the beginning date?
      </Heading>
      <Text>
        Your service will begin on the selected date during the early
        morning hours, before 9.00
      </Text>
    </Tooltip>
  }
/>;
```

### Props & methods

DateInput component supports [margin props](./#/Spacing/Margin%20props) for spacing.
