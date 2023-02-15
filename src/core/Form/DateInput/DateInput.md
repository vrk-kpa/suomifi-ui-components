### Default DateInput

```js
import { DateInput } from 'suomifi-ui-components';
import React from 'react';

<>
  <DateInput labelText="Date" hintText="Use format D.M.YYYY" />
</>;
```

### DateInput with DatePicker

```js
import { DateInput } from 'suomifi-ui-components';
import React from 'react';

<>
  <DateInput
    labelText="Date"
    hintText="Use format D.M.YYYY"
    language="en"
    datePickerEnabled
  />
</>;
```

### DateInput with DatePicker, smallScreen

```js
import { DateInput } from 'suomifi-ui-components';
import React, { useState } from 'react';

<>
  <DateInput
    labelText="Date"
    hintText="Use format D.M.YYYY"
    language="en"
    datePickerEnabled
    variant="smallScreen"
  />
</>;
```

### DateInput with minDate, maxDate, and change validation

```js
import { DateInput } from 'suomifi-ui-components';
import { isWithinInterval } from 'date-fns';
import React from 'react';

const minDate = new Date(2010, 11, 16); // 16.12.2010
const maxDate = new Date(2020, 11, 15); // 15.12.2020
const [statusText, setStatusText] = React.useState('');
const [status, setStatus] = React.useState('default');
const validate = ({ value, date }) => {
  if (isWithinInterval(date, { start: minDate, end: maxDate })) {
    setStatusText('');
    setStatus('default');
  } else {
    setStatusText('Format D.M.YYYY');
    setStatus('error');
  }
};

<>
  <DateInput
    labelText="Date"
    hintText="Use format D.M.YYYY"
    language="en"
    datePickerEnabled
    minDate={minDate}
    maxDate={maxDate}
    onChange={validate}
    debounce={300}
    status={status}
    statusText={statusText}
  />
</>;
```

### DateInput with initialDate

```js
import { DateInput } from 'suomifi-ui-components';
import React from 'react';

<>
  <DateInput
    labelText="Date"
    hintText="Use format D.M.YYYY"
    language="en"
    datePickerEnabled
    initialDate={new Date(2023, 0, 1)}
  />
</>;
```

### DateInput with dates disabled

```js
import { DateInput } from 'suomifi-ui-components';
import { isWeekend } from 'date-fns';
import React from 'react';

<>
  <DateInput
    labelText="Date"
    hintText="Use format D.M.YYYY"
    language="en"
    datePickerEnabled
    shouldDisableDate={(date) => isWeekend(date)}
  />
</>;
```

### DateInput with custom dateAdapter

```js
import { DateInput } from 'suomifi-ui-components';
import { format, parse } from 'date-fns';
import React from 'react';

const customDateAdapter = {
  format: (date) => format(date, 'y-M-d'),
  parse: (value) => parse(value, 'y-M-d', new Date())
};

<>
  <DateInput
    labelText="Date"
    hintText="Use format YYYY-M-D"
    language="en"
    datePickerEnabled
    dateAdapter={customDateAdapter}
    defaultValue="2023-1-1"
  />
</>;
```

### DatePicker with custom texts

```js
import { DateInput } from 'suomifi-ui-components';
import React from 'react';

<>
  <DateInput
    labelText="Date"
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
  />
</>;
```

### Label options

```js
import { DateInput } from 'suomifi-ui-components';
import React from 'react';

<>
  <DateInput
    onBlur={(event) => console.log(event.target.value)}
    labelText="Visible label"
  />
  <DateInput
    onBlur={(event) => console.log(event.target.value)}
    labelText="Hidden label"
    labelMode="hidden"
    visualPlaceholder="Has hidden label"
  />
</>;
```

### Hint text

```js
import { DateInput } from 'suomifi-ui-components';
import React from 'react';

const exampleRef = React.createRef();

<>
  <DateInput
    onBlur={(event) => console.log(event.target.value)}
    labelText="Date"
    language="en"
    hintText="Use format D.M.YYYY"
  />
</>;
```

### Optional text

```js
import { DateInput } from 'suomifi-ui-components';
import React from 'react';

<>
  <DateInput labelText="Date" optionalText="optional" />
</>;
```

### Ref

```js
import { DateInput } from 'suomifi-ui-components';
import React from 'react';

const exampleRef = React.createRef();

<>
  <DateInput
    labelText="Date"
    ref={exampleRef}
    onChange={() => {
      console.log(exampleRef.current);
    }}
  />
</>;
```

### Statuses

```js
import { DateInput } from 'suomifi-ui-components';

<>
  <DateInput
    onBlur={(event) => console.log(event.target.value)}
    labelText="Default"
    language="en"
    datePickerEnabled
  />
  <DateInput
    status="error"
    labelText="Error"
    language="en"
    datePickerEnabled
  />
  <DateInput
    status="success"
    labelText="Success"
    language="en"
    datePickerEnabled
  />
</>;
```

### DateInput with changing error status

```js
import { DateInput, Button } from 'suomifi-ui-components';

const [errorState, setErrorState] = React.useState(false);
const simplifiedRegex = /[0-9]{1,2}\.[0-9]{1,2}\.[0-9]{1,4}/g;
const statusText = errorState
  ? 'You entered invalid data'
  : undefined;
const status = errorState ? 'error' : 'default';

<DateInput
  labelText="Date"
  hintText="Use format D.M.YYYY"
  language="en"
  statusText={statusText}
  status={status}
  debounce={300}
  onChange={({ value }) => {
    const isValid = simplifiedRegex.test(value);
    setErrorState(!isValid);
  }}
/>;
```

### DateInput with fixed width or full width

```js
import { DateInput, Button } from 'suomifi-ui-components';
<>
  <DateInput
    labelText="200px"
    language="en"
    wrapperProps={{ style: { width: '200px' } }}
    datePickerEnabled
  />

  <DateInput
    labelText="100% width"
    language="en"
    fullWidth
    datePickerEnabled
  />
</>;
```

### DateInput with debounced onChange event

```js
import { DateInput } from 'suomifi-ui-components';

<>
  <DateInput
    labelText="Date"
    onChange={(change) => console.log(change)}
    debounce={800}
  />
</>;
```

### DateInput with tooltip

```js
import {
  DateInput,
  Tooltip,
  Heading,
  Text
} from 'suomifi-ui-components';

<>
  <DateInput
    labelText="Date"
    language="en"
    tooltipComponent={
      <Tooltip
        ariaToggleButtonLabelText="Date, additional information"
        ariaCloseButtonLabelText="'Date, close additional information"
      >
        <Heading variant="h5" as="h2">
          Date
        </Heading>
        <Text>Example text</Text>
      </Tooltip>
    }
  />
</>;
```
