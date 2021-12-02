```js
import { InlineNotification, Paragraph } from 'suomifi-ui-components';

<>
  <InlineNotification
    closeText="Close"
    labelText="Lorem ipsum dolor sit"
    headingVariant="h3"
  >
    <Paragraph>
      The service will be temporarily unavailable on 5.6.2021 at 21.00
      – 23.59 due to maintenance.
    </Paragraph>
  </InlineNotification>

  <InlineNotification
    status="error"
    labelText="Lorem ipsum dolor sit"
  >
    <Paragraph>
      Something went wrong. Please try again in a moment.
    </Paragraph>
  </InlineNotification>

  <InlineNotification status="success" labelText="All good">
    <Paragraph>Password Uptated.</Paragraph>
  </InlineNotification>
  <InlineNotification status="success">
    <Paragraph>Password Uptated.</Paragraph>
  </InlineNotification>
  <InlineNotification labelText="Long label Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi est nulla, rhoncus ac odio at">
    <Paragraph>
      The service will be temporarily unavailable on 5.6.2021 at 21.00
      – 23.59 due to maintenance.
    </Paragraph>
  </InlineNotification>
</>;
```
