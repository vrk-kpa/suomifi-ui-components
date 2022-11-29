```js
import { DateInput } from 'suomifi-ui-components';
import React from 'react';

const exampleRef = React.createRef();

<>
  <DateInput
    labelText="DateInput with DatePicker"
    hintText="Use format D.M.YYYY"
    datePickerEnabled
  />
</>;
```

```js
import { DateInput } from 'suomifi-ui-components';
import React from 'react';

const exampleRef = React.createRef();

<>
  <DateInput
    onBlur={(event) => console.log(event.target.value)}
    labelText="DateInput with visible label"
    hintText="Use format D.M.YYYY"
  />
  <DateInput
    onBlur={(event) => console.log(event.target.value)}
    labelText="Test DateInput with hidden label and a visual placeholder"
    labelMode="hidden"
    hintText="Use format D.M.YYYY"
    visualPlaceholder="This input has a hidden label"
  />
  <DateInput
    onBlur={(event) => console.log(event.target.value)}
    labelText="DateInput with hint text"
    hintText="Use format D.M.YYYY"
  />
  <DateInput
    labelText="DateInput with optional text and ref"
    hintText="Use format D.M.YYYY"
    optionalText="optional"
    ref={exampleRef}
    onChange={() => {
      console.log(exampleRef.current);
    }}
  />
</>;
```

```js
import { DateInput } from 'suomifi-ui-components';

<>
  <DateInput
    onBlur={(event) => console.log(event.target.value)}
    labelMode="hidden"
    labelText="Test with hidden label"
    hintText="Use format D.M.YYYY"
    defaultValue="Test with hidden label"
    datePickerEnabled
  />
  <DateInput
    status="error"
    labelMode="hidden"
    labelText="Error with hidden label"
    hintText="Use format D.M.YYYY"
    defaultValue="Error with hidden label"
    datePickerEnabled
  />
  <DateInput
    status="success"
    labelMode="hidden"
    labelText="Success with hidden label"
    hintText="Use format D.M.YYYY"
    defaultValue="Success with hidden label"
    datePickerEnabled
  />
</>;
```

```js
import { DateInput, Button } from 'suomifi-ui-components';

const [errorState, setErrorState] = React.useState(false);
const statusText = errorState
  ? 'You entered invalid data'
  : undefined;
const status = errorState ? 'error' : 'default';

<DateInput
  labelText="DateInput with changing error status"
  hintText="Use format D.M.YYYY"
  statusText={statusText}
  status={status}
  debounce={300}
  onChange={() => {
    setErrorState(!errorState);
  }}
/>;
```

```js
import { DateInput, Button } from 'suomifi-ui-components';
<>
  <DateInput
    labelText="Test DateInput with fixed custom width of 200px"
    hintText="Use format D.M.YYYY"
    wrapperProps={{ style: { width: '200px' } }}
    datePickerEnabled
  />

  <DateInput
    labelText="Test DateInput with 100% width"
    hintText="Use format D.M.YYYY"
    fullWidth
    datePickerEnabled
  />
</>;
```

```js
import { DateInput } from 'suomifi-ui-components';

<>
  <DateInput
    labelText="DateInput with debounced onChange event"
    hintText="Use format D.M.YYYY"
    onChange={(value) => console.log(value)}
    debounce={800}
  />
</>;
```
