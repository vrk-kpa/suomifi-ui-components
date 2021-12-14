```js
import {
  Notification,
  Button,
  Paragraph
} from 'suomifi-ui-components';

<>
  <Notification closeText="Close" smallScreen>
    Et turpis eget tempor. Nam sed lacus ut lorem feugiat tincidunt.
    Mauris quis nisi placerat
  </Notification>
  <Notification
    status="error"
    labelText="Lorem ipsum dolor sit"
    smallScreen
  >
    Et turpis eget tempor. Nam sed lacus ut lorem feugiat tincidunt.
    Mauris quis nisi placerat
  </Notification>
  <Notification
    closeText="Close"
    smallScreen
    labelText="Lorem ipsum dolor sit"
    headingVariant="h3"
    actionElements={<Button variant="secondary">Button</Button>}
  >
    Et turpis eget tempor. Nam sed lacus ut lorem feugiat tincidunt.
    Mauris quis nisi placerat
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
    Et turpis eget tempor. Nam sed lacus ut lorem feugiat tincidunt.
    Mauris quis nisi placerat
  </Notification>
  <Notification closeText="Close">
    <Paragraph style={{ fontSize: '16px' }}>
      This is a long notification text. Lorem ipsum dolor sit amet,
      consectetur adipiscing elit.
    </Paragraph>
    <Paragraph style={{ fontSize: '16px' }}>
      Et turpis eget tempor. Nam sed lacus ut lorem feugiat tincidunt.
      Mauris quis nisi placerat, convallis turpis nec, auctor massa.
      Nam ornare tortor id tortor tristique.
    </Paragraph>
  </Notification>
  <Notification
    closeText="Close"
    labelText="Notification"
    actionElements={<Button variant="secondary">Button</Button>}
  >
    This is a long notification text. Lorem ipsum dolor sit amet,
    consectetur adipiscing elit. Morbi est nulla, rhoncus ac odio at,
    blandit ornare mi. Suspendisse potenti.
  </Notification>
  <Notification
    closeText="Close"
    labelText="Notification"
    actionElements={
      <>
        <Button>Button</Button>
        <Button variant="secondary">Button</Button>
      </>
    }
  >
    This is a long notification text. Lorem ipsum dolor sit amet,
    consectetur adipiscing elit. Morbi est nulla, rhoncus ac odio at,
    blandit ornare mi. Suspendisse potenti.
  </Notification>

  <Notification
    status="error"
    closeText="Long close text"
    labelText="Lorem ipsum dolor sit"
  >
    Et turpis eget tempor. Nam sed lacus ut lorem feugiat tincidunt.
    Mauris quis nisi placerat
  </Notification>
</>;
```
