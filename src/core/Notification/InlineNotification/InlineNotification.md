```js
import { InlineNotification } from 'suomifi-ui-components';

<>
  <InlineNotification
    closeText="Close"
    labelText="Lorem ipsum dolor sit"
  >
    <p>
      The service will be temporarily unavailable on 5.6.2021 at 21.00
      – 23.59 due to maintenance.
    </p>
  </InlineNotification>

  <InlineNotification
    status="error"
    labelText="Lorem ipsum dolor sit"
  >
    <p>Something went wrong. Please try again in a moment.</p>
  </InlineNotification>

  <InlineNotification status="success" labelText="All good">
    <p>Password Uptated.</p>
  </InlineNotification>
  <InlineNotification status="success">
    <p>Password Uptated.</p>
  </InlineNotification>
  <InlineNotification labelText="Long label Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi est nulla, rhoncus ac odio at">
    <p>
      The service will be temporarily unavailable on 5.6.2021 at 21.00
      – 23.59 due to maintenance.
    </p>
  </InlineNotification>
</>;
```
