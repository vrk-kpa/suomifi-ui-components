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

```js
import React from 'react';
import { Label, Tooltip, Heading, Text } from 'suomifi-ui-components';

const labelText = 'Label With a tooltip';

<div>
  <Label
    htmlFor="custom-input-with-tooltip"
    optionalText="optional"
    wrapperProps={{ style: { marginBottom: '10px' } }}
    tooltipComponent={
      <Tooltip
        ariaToggleButtonLabelText={`${labelText}, additional information`}
        ariaCloseButtonLabelText={`${labelText}, close additional information`}
      >
        <Heading variant="h5" as="h2">
          Tooltip
        </Heading>
        <Text>Tooltip text for a text that requires a tooltip</Text>
      </Tooltip>
    }
  >
    {labelText}
  </Label>
  <input id="custom-input-with-tooltip" type="text" />
</div>;
```
