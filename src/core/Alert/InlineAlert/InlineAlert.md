```js
import { InlineAlert } from 'suomifi-ui-components';

<>
  <InlineAlert labelText="Notification">
    The service will be temporarily unavailable on 5.6.2021 at 21.00 –
    23.59 due to maintenance.
  </InlineAlert>

  <InlineAlert status="error" labelText="Error">
    Something went wrong. Please try again in a moment.
  </InlineAlert>

  <InlineAlert status="warning">
    Something is not right. Please try again in a moment.
  </InlineAlert>
</>;
```
