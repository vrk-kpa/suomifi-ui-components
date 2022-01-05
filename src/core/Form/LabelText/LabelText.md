LabelText is an accessible label component to use with custom input elements. Applicable form components in the library already have LabelText as an integral part.

```js
import { LabelText } from 'suomifi-ui-components';
import React from 'react';

<LabelText>This is a label for an adjacent input</LabelText>;
<LabelText optionalText="optional">
  Label for an optional field
</LabelText>;
<LabelText labelMode="hidden">A visually hidden label</LabelText>;
```
