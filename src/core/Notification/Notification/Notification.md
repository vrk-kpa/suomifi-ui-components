```js
import { Notification, Button } from 'suomifi-ui-components';

<>
  <Notification
    closeText="Close"
    smallScreen
    labelText="Lorem ipsum dolor sit"
    buttonContent={<Button variant="secondary">Button</Button>}
  >
    <p>
      The service will be temporarily unavailable on 5.6.2021 at 21.00
      – 23.59 due to maintenance.
    </p>
  </Notification>
  <Notification
    closeText="Close"
    smallScreen
    labelText="Lorem ipsum dolor sit"
    buttonContent={
      <>
        <Button>Button</Button>
        <Button variant="secondary">Button</Button>
      </>
    }
  >
    <p>
      The service will be temporarily unavailable on 5.6.2021 at 21.00
      – 23.59 due to maintenance.
    </p>
  </Notification>
  <Notification
    closeText="Close"
    labelText="Maintenance notification"
    buttonContent={<Button variant="secondary">Button</Button>}
  >
    <p>
      This is a long notification text. Lorem ipsum dolor sit amet,
      consectetur adipiscing elit. Morbi est nulla, rhoncus ac odio
      at, blandit ornare mi. Suspendisse potenti. Vestibulum ante
      ipsum primis in faucibus orci luctus et ultrices posuere cubilia
      curae; Suspendisse efficitur et turpis eget tempor. Nam sed
      lacus ut lorem feugiat tincidunt. Mauris quis nisi placerat,
      convallis turpis nec, auctor massa. Nam ornare tortor id tortor
      tristique, in semper augue fermentum. Nulla at pharetra leo, a
      ullamcorper metus. Donec molestie velit tristique feugiat
      interdum. Donec ultrices efficitur pellentesque. Sed luctus ac
      metus sed rhoncus.
    </p>
  </Notification>
  <Notification
    closeText="Close"
    labelText="Maintenance notification"
    buttonContent={
      <>
        <Button>Button</Button>
        <Button variant="secondary">Button</Button>
      </>
    }
  >
    <p>
      This is a long notification text. Lorem ipsum dolor sit amet,
      consectetur adipiscing elit. Morbi est nulla, rhoncus ac odio
      at, blandit ornare mi. Suspendisse potenti. Vestibulum ante
      ipsum primis in faucibus orci luctus et ultrices posuere cubilia
      curae; Suspendisse efficitur et turpis eget tempor. Nam sed
      lacus ut lorem feugiat tincidunt. Mauris quis nisi placerat,
      convallis turpis nec, auctor massa. Nam ornare tortor id tortor
      tristique, in semper augue fermentum. Nulla at pharetra leo, a
      ullamcorper metus. Donec molestie velit tristique feugiat
      interdum. Donec ultrices efficitur pellentesque. Sed luctus ac
      metus sed rhoncus.
    </p>
  </Notification>

  <Notification
    status="error"
    closeText="Long close text"
    labelText="Lorem ipsum dolor sit"
  >
    <p>Something went wrong. Please try again in a moment.</p>
  </Notification>

  <Notification
    status="success"
    closeText="Close"
    labelText="Lorem ipsum dolor sit"
  >
    <p>
      This is a long notification text. Lorem ipsum dolor sit amet,
      consectetur adipiscing elit. Morbi est nulla, rhoncus ac odio
      at, blandit ornare mi. Suspendisse potenti. Vestibulum ante
      ipsum primis in faucibus orci luctus et ultrices posuere cubilia
      curae; Suspendisse efficitur et turpis eget tempor. Nam sed
      lacus ut lorem feugiat tincidunt.
    </p>
  </Notification>
</>;
```
