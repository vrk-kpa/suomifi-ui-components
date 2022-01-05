StatusText is a component that is used under input elements to show error messages and other status messages. Give the ID of the HintText as an `aria-describedby` value to the related component. Applicable form components in the library already have StatusText as an integral part.

```js
import { StatusText } from 'suomifi-ui-components';
import React from 'react';
<>
  <StatusText>A regular StatusText</StatusText>
  <StatusText status="error">An error message</StatusText>
</>;
```
