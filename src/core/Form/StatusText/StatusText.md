StatusText is a component that is used under input elements to show error messages and other status messages. Give the ID of the HintText as an `aria-describedby` value to the related component. Applicable form components in the library already have StatusText as an integral part. StatusText should not be rendered conditionally if `aria-live` is enabled.

```js
import React, { useState } from 'react';
import { StatusText } from 'suomifi-ui-components';

const [error, setError] = useState(true);

<>
  <StatusText>A regular StatusText</StatusText>
  <StatusText status="error">An error message</StatusText>
  <div>
    <label for="custom_input" style={{ display: 'block' }}>
      Custom input
    </label>
    <input
      id="custom_input"
      type="text"
      onChange={() => setError(!error)}
    />
    <StatusText
      status="error"
      aria-live="polite"
      style={{ marginTop: error ? '5px' : '0' }}
    >
      {error ? 'A conditional error message' : ''}
    </StatusText>
  </div>
</>;
```
