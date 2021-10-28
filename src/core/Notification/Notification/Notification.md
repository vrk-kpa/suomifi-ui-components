```js
import {
  Notification,
  InlineNotification,
  Button
} from 'suomifi-ui-components';

<>
  <Notification closeText="Close" smallScreen>
    The service will be temporarily unavailable on 5.6.2021 at 21.00 –
    23.59 due to maintenance.
  </Notification>

  <Notification
    closeText="Close"
    labelText="Maintenance notification"
  >
    This is a long notification text. Lorem ipsum dolor sit amet,
    consectetur adipiscing elit. Morbi est nulla, rhoncus ac odio at,
    blandit ornare mi. Suspendisse potenti. Vestibulum ante ipsum
    primis in faucibus orci luctus et ultrices posuere cubilia curae;
    Suspendisse efficitur et turpis eget tempor. Nam sed lacus ut
    lorem feugiat tincidunt. Mauris quis nisi placerat, convallis
    turpis nec, auctor massa. Nam ornare tortor id tortor tristique,
    in semper augue fermentum. Nulla at pharetra leo, a ullamcorper
    metus. Donec molestie velit tristique feugiat interdum. Donec
    ultrices efficitur pellentesque. Sed luctus ac metus sed rhoncus.
  </Notification>

  <InlineNotification status="error">
    <p>Something went wrong. Please try again in a moment.</p>
    <Button fullWidth variant="secondary">
      Button fullWidth variant="secondary"
    </Button>
  </InlineNotification>

  <Notification status="error" closeText="Long close text">
    Something went wrong. Please try again in a moment.
  </Notification>

  <Notification status="success" closeText="Close">
    This is a long notification text. Lorem ipsum dolor sit amet,
    consectetur adipiscing elit. Morbi est nulla, rhoncus ac odio at,
    blandit ornare mi. Suspendisse potenti. Vestibulum ante ipsum
    primis in faucibus orci luctus et ultrices posuere cubilia curae;
    Suspendisse efficitur et turpis eget tempor. Nam sed lacus ut
    lorem feugiat tincidunt.
  </Notification>

  <InlineNotification status="success" labelText="Warning">
    Password Uptated.
  </InlineNotification>

  <InlineNotification labelText="Long label Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi est nulla, rhoncus ac odio at">
    The service will be temporarily unavailable on 5.6.2021 at 21.00 –
    23.59 due to maintenance.
  </InlineNotification>
</>;
```
