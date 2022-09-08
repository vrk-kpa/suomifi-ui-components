```js
import { InlineAlert } from 'suomifi-ui-components';
import { createRef } from 'react';

const exampleRef = createRef();

<>
  <InlineAlert labelText="Info" ref={exampleRef}>
    Make sure that your name is typed exactly as it appears in your
    identification.
  </InlineAlert>

  <InlineAlert status="error" labelText="Error">
    Something went wrong. Please try again in a moment.
  </InlineAlert>

  <InlineAlert status="warning">
    Something is not right. Please try again in a moment.
  </InlineAlert>
</>;
```
