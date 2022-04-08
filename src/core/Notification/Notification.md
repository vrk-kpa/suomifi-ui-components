```js
import {
  Notification,
  Button,
  Paragraph
} from 'suomifi-ui-components';

<>
  <Notification closeText="Close" accessibilityLabel="Ilmoitus">
    This is a notification text.
  </Notification>
  <Notification
    status="error"
    headingText="Error notification"
    closeText="Close"
    smallScreen
  >
    This is a small screen error notification text.
  </Notification>
  <Notification
    id="notification-1"
    closeText="Close"
    headingText="Notification heading"
    headingVariant="h3"
    actionElements={
      <>
        <Button variant="secondary" aria-describedby="notification-1">
          Action button
        </Button>
      </>
    }
  >
    <Paragraph style={{ fontSize: '16px', marginBottom: '7px' }}>
      This is a short paragraph text.
    </Paragraph>
    <Paragraph style={{ fontSize: '16px' }}>
      This is a long paragraph text. Et turpis eget tempor. Nam sed
      lacus ut lorem feugiat tincidunt. Mauris quis nisi placerat,
      convallis turpis nec, auctor massa. Nam ornare tortor id tortor
      tristique.
    </Paragraph>
  </Notification>
</>;
```
