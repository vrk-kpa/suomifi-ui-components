```js
import { InlineNotification } from 'suomifi-ui-components';

<>
  <InlineNotification
    closeText="Close"
    labelText="Lorem ipsum dolor sit"
  >
    The service will be temporarily unavailable on 5.6.2021 at 21.00 –
    23.59 due to maintenance.
  </InlineNotification>

  <InlineNotification
    status="error"
    labelText="Lorem ipsum dolor sit"
  >
    <p>Something went wrong. Please try again in a moment.</p>
  </InlineNotification>

  <InlineNotification status="success" labelText="All good">
    Password Uptated.
  </InlineNotification>

  <InlineNotification labelText="Long label Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi est nulla, rhoncus ac odio at">
    The service will be temporarily unavailable on 5.6.2021 at 21.00 –
    23.59 due to maintenance.
  </InlineNotification>
</>;
```
