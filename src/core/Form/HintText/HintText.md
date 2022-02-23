HintText is a component that generates an accessible hint text for an adjacent element. Give the ID of the HintText as an `aria-describedby` value to the related component. Applicable form components in the library already have HintText as an integral part.

```js
import React from 'react';
import { HintText } from 'suomifi-ui-components';

<HintText>This is a hint regarding an adjacent input</HintText>;
```

```js
import React from 'react';
import { HintText } from 'suomifi-ui-components';

<>
  <div>
    <label
      htmlFor="custom-input"
      style={{ display: 'block', marginBottom: '10px' }}
    >
      Custom input
    </label>
    <HintText id="hint-text" style={{ marginBottom: '10px' }}>
      This is a hint regarding an adjacent input
    </HintText>
    <input
      id="custom-input"
      type="text"
      aria-describedby="hint-text"
    />
  </div>
</>;
```
