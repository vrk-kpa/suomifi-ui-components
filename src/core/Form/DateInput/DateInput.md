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
    datePickerEnabled
  />
</>;
```

### DateInput with minDate, maxDate, and initialDate

```js
import { DateInput } from 'suomifi-ui-components';
import React from 'react';

<>
  <DateInput
    labelText="Date"
    hintText="Use format D.M.YYYY"
    datePickerEnabled
    minDate={new Date(2010, 1, 1)}
    maxDate={new Date(2020, 12, 31)}
    initialDate={new Date(2015, 6, 1)}
  />
</>;
```

### DateInput with custom dateAdapter

```js
import { DateInput } from 'suomifi-ui-components';
import React from 'react';

const simplifiedDateAdapter = {
  format: (date) =>
    `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
  parse: (value) => {
    const values = value.split('-');
    return new Date(values[0], values[1] - 1, values[2]);
  }
};

<>
  <DateInput
    labelText="Date"
    hintText="Use format D.M.YYYY"
    datePickerEnabled
    dateAdapter={simplifiedDateAdapter}
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
    datePickerEnabled
    datePickerTexts={{
      monthNames: [
        'tammi',
        'helmi',
        'maalis',
        'huhti',
        'touko',
        'kesä',
        'heinä',
        'elo',
        'syys',
        'loka',
        'marras',
        'joulu'
      ],
      weekDayAbbreviations: ['M', 'T', 'K', 'T', 'P', 'L', 'S']
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
    datePickerEnabled
  />
  <DateInput status="error" labelText="Error" datePickerEnabled />
  <DateInput status="success" labelText="Success" datePickerEnabled />
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
    wrapperProps={{ style: { width: '200px' } }}
    datePickerEnabled
  />

  <DateInput labelText="100% width" fullWidth datePickerEnabled />
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
