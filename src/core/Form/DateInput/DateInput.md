```js
import { DateInput } from 'suomifi-ui-components';
import React from 'react';

const exampleRef = React.createRef();

<>
  <DateInput
    onBlur={(event) => console.log(event.target.value)}
    labelText="DateInput with visible label"
  />
  <DateInput
    onBlur={(event) => console.log(event.target.value)}
    labelText="Test DateInput with hidden label and a visual placeholder"
    labelMode="hidden"
    visualPlaceholder="This input has a hidden label"
  />
  <DateInput
    onBlur={(event) => console.log(event.target.value)}
    labelText="DateInput with hint text"
    hintText="Use format DD.MM.YYYY"
  />
  <DateInput
    labelText="DateInput with optional text and ref"
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
    defaultValue="Test with hidden label"
  />
  <DateInput
    status="error"
    labelMode="hidden"
    labelText="Error with hidden label"
    defaultValue="Error with hidden label"
  />
  <DateInput
    status="success"
    labelMode="hidden"
    labelText="Success with hidden label"
    defaultValue="Success with hidden label"
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
    labelText="Test DateInput with fixed custom width of 250px"
    wrapperProps={{ style: { width: '250px' } }}
  />

  <DateInput labelText="Test DateInput with 100% width" fullWidth />
</>;
```

```js
import { DateInput } from 'suomifi-ui-components';

<>
  <DateInput
    labelText="DateInput with debounced onChange event"
    onChange={(value) => console.log(value)}
    debounce={800}
  />
</>;
```
