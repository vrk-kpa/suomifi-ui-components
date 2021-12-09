```js
import {
  Notification,
  Button,
  Paragraph
} from 'suomifi-ui-components';

<>
  <Notification closeText="Close" smallScreen>
    The service will be temporarily unavailable on 5.6.2021 at 21.00 –
    23.59 due to maintenance.
  </Notification>
  <Notification
    status="error"
    labelText="Lorem ipsum dolor sit"
    smallScreen
  >
    Something went wrong. Please try again in a moment.
  </Notification>
  <Notification
    closeText="Close"
    smallScreen
    labelText="Lorem ipsum dolor sit"
    headingVariant="h3"
    actionElements={<Button variant="secondary">Button</Button>}
  >
    The service will be temporarily unavailable on 5.6.2021 at 21.00 –
    23.59 due to maintenance.
  </Notification>
  <Notification
    closeText="Close"
    smallScreen
    labelText="Lorem ipsum dolor sit"
    headingVariant="h2"
    actionElements={
      <>
        <Button>Button</Button>
        <Button variant="secondary">Button</Button>
      </>
    }
  >
    The service will be temporarily unavailable on 5.6.2021 at 21.00 –
    23.59 due to maintenance.
  </Notification>
  <Notification closeText="Close">
    <Paragraph>
      This is a long notification text. Lorem ipsum dolor sit amet,
      consectetur adipiscing elit. Morbi est nulla, rhoncus ac odio
      at, blandit ornare mi. Suspendisse potenti. Vestibulum ante
      ipsum primis in faucibus orci luctus et ultrices posuere cubilia
      curae; Suspendisse efficitur.
    </Paragraph>
    <Paragraph>
      Et turpis eget tempor. Nam sed lacus ut lorem feugiat tincidunt.
      Mauris quis nisi placerat, convallis turpis nec, auctor massa.
      Nam ornare tortor id tortor tristique, in semper augue
      fermentum. Nulla at pharetra leo, a ullamcorper metus. Donec
      molestie velit tristique feugiat interdum. Donec ultrices
      efficitur pellentesque. Sed luctus ac metus sed rhoncus.
    </Paragraph>
  </Notification>
  <Notification
    closeText="Close"
    labelText="Maintenance notification"
    actionElements={<Button variant="secondary">Button</Button>}
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
  <Notification
    closeText="Close"
    labelText="Maintenance notification"
    actionElements={
      <>
        <Button>Button</Button>
        <Button variant="secondary">Button</Button>
      </>
    }
  >
    This is a long notification text. Lorem ipsum dolor sit amet,
    consectetur adipiscing elit. Morbi est nulla, rhoncus ac odio at,
    blandit ornare mi. Suspendisse potenti. Vestibulum ante ipsum
    primis in faucibus orci luctus et ultrices posuere cubilia curae;
    Suspendisse efficitur et turpis eget tempor. Nam sed lacus ut.
  </Notification>

  <Notification
    status="error"
    closeText="Long close text"
    labelText="Lorem ipsum dolor sit"
  >
    Something went wrong. Please try again in a moment.
  </Notification>
</>;
```
