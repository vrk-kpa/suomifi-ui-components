`<StatusText>` is a component that is used under input elements to show error messages and other status messages.

Give the id of the StatusText as an `aria-describedby` value to the related component. Applicable form components in the library already have StatusText as an integral part.

StatusText should not be rendered conditionally unless `aria-live` is explicitly turned off.

Examples:

- [Basic use](/#/Components/StatusText?id=basic-use)
- [Conditional status text](/#/Components/StatusText?id=conditional-status-text)

<div style="margin-bottom: 40px">
  <a href="/#/Components/StatusText?id=props--methods">Props & methods</a>
</div>

### Basic use

```js
import { StatusText } from 'suomifi-ui-components';

<>
  <div>
    <input type="text" aria-describedby="status-1" />
    <StatusText id="status-1">A regular StatusText</StatusText>
  </div>
  <div>
    <input type="text" aria-describedby="status-2" />
    <StatusText status="error" id="status-2">
      An error message
    </StatusText>
  </div>
</>;
```

### Conditional status text

Even if the status and content of the element is conditional, keep the component itself in the DOM and render the content conditionally. That way screen reader users will be notified of the changing status.

If you want to disable the `aria-live` property of the region, you can do so using the `ariaLiveMode` property of the component.

```js
import React, { useState } from 'react';
import { StatusText, Label } from 'suomifi-ui-components';

const [error, setError] = useState(true);

<>
  <div>
    <Label htmlFor="custom-input">First name</Label>
    <input
      id="custom-input"
      type="text"
      aria-describedby="status-text"
      onChange={(event) => setError(!(event.target.value.length > 0))}
    />
    <StatusText
      id="status-text"
      status="error"
      style={{ marginTop: error ? '5px' : '0' }}
    >
      {error ? 'First name is a required field' : ''}
    </StatusText>
  </div>
</>;
```

### Props & Methods
