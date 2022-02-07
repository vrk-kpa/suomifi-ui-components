Label is an accessible label component to use with custom input elements. Applicable form components in the library already have Label as an integral part.

```js
import React from 'react';
import { Label } from 'suomifi-ui-components';
<>
  <Label>This is a label for an adjacent input</Label>
  <Label optionalText="optional">Label for an optional field</Label>
  <Label labelMode="hidden">A visually hidden label</Label>
</>;
```

```js
import React from 'react';
import { Label } from 'suomifi-ui-components';

<>
  <div>
    <Label
      htmlFor="custom-input"
      optionalText="optional"
      style={{ marginBottom: '10px' }}
    >
      Label for an optional field
    </Label>
    <input id="custom-input" type="text" />
  </div>
</>;
```
