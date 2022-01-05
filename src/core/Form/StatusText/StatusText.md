StatusText is a component that is used under input elements to show error messages and other status messages. Give the ID of the HintText as an `aria-describedby` value to the related component. Applicable form components in the library already have StatusText as an integral part.

```js
import { LabelText } from 'suomifi-ui-components';
import React from 'react';

<LabelText>This is a label for an adjacent input</LabelText>;
<LabelText optionalText="optional">
  Label for an optional field
</LabelText>;
<LabelText labelMode="hidden">A visually hidden label</LabelText>;
```
