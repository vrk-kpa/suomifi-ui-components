`<DateInput>` is used to input dates. Additionally, you can use the date picker calendar to allow users to select the date.

Examples:

<ul>
  <li><a href="/#/Components/DateInput?id=basic-use">Basic use</a></li>
  <li><a href="/#/Components/DateInput?id=default-value">Default value</a></li>
  <li><a href="/#/Components/DateInput?id=controlled-value">Controlled value</a></li>
  <li><a href="/#/Components/DateInput?id=date-picker">Date picker</a></li>
  <li><a href="/#/Components/DateInput?id=mindate--maxdate">MinDate & maxDate</a></li>
  <li><a href="/#/Components/DateInput?id=validation">Validation</a></li>
  <li><a href="/#/Components/DateInput?id=initial-focused-date-in-date-picker">Initial focused date in date picker</a></li>
  <li><a href="/#/Components/DateInput?id=disabled-dates-in-date-picker">Disabled dates in date picker</a></li>
  <li><a href="/#/Components/DateInput?id=custom-dateadapter">Custom dateAdapter</a></li>
  <li><a href="/#/Components/DateInput?id=custom-texts-for-date-picker">Custom texts for date picker</a></li>
  <li><a href="/#/Components/DateInput?id=accessing-value-with-ref">Accessing value with ref</a></li>
  <li><a href="/#/Components/DateInput?id=small-screen-date-picker">Small screen date picker</a></li>
  <li><a href="/#/Components/DateInput?id=hidden-label">Hidden label</a></li>
  <li><a href="/#/Components/DateInput?id=optional-input">Optional input</a></li>
  <li><a href="/#/Components/DateInput?id=full-width-and-fixed-width">Full width and fixed width</a></li>
  <li><a href="/#/Components/DateInput?id=tooltip">Tooltip</a></li>
</ul>

<div style="margin-bottom: 40px">
  <a href="/#/Components/DateInput?id=props--methods">Props & methods</a>
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

Use the `onChange()` function to run validation logic and set the `status` and `statusText` props accordingly.

`date-fns` is a dependency of `suomifi-ui-components` so you can use it for validations.

You can use the `debounce` prop to apply delay to `onChange()`.

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

For a full list of customisable text options, refer to <a href="/#/Components/DateInput?id=props--methods">props & methods</a>

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

### Optional input

By default, all Suomi.fi form inputs are considered required. If the input is not required, you can set the `optionalText` prop to mark it as such.

```js
import { DateInput } from 'suomifi-ui-components';

<DateInput
  labelText="Beginning date"
  hintText="Use format D.M.YYYY"
  optionalText="optional"
/>;
```

### Full width and fixed width

You can use the `fullWidth` prop to make the input take all available horizontal space.

You can use `wrapperProps` to set inline styles for the input.

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
    wrapperProps={{ style: { width: '200px' } }}
  />
</>;
```

### Tooltip

A `<Tooltip>` component can be used with DateInput to provide additional information.

Do not use Tooltip for formatting instructions. Tooltip can be used for other nice-to-know information.

For instructions regarding how to ensure your Tooltip is accessible, please refer to the <a href="/#/Components/Tooltip">Tooltip documentation.</a>

```js
import { DateInput, Tooltip, Text } from 'suomifi-ui-components';

const labelText = 'Beginning date';

<DateInput
  labelText={labelText}
  hintText="Use format D.M.YYYY"
  datePickerEnabled
  language="en"
  tooltipComponent={
    <Tooltip
      ariaToggleButtonlabelText={`${labelText}, show additional information`}
      ariaCloseButtonlabelText={`${labelText}, close additional information`}
    >
      <Text>
        Your service will begin on the selected date during the early
        morning hours, before 9.00
      </Text>
    </Tooltip>
  }
/>;
```

### Props & methods
