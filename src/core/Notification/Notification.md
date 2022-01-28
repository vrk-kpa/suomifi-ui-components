```js
import {
  Notification,
  Button,
  Paragraph
} from 'suomifi-ui-components';

<>
  <Notification closeText="This is very long close button text.">
    This is a short notification text.
  </Notification>
  <Notification
    status="error"
    headingText="Error notification"
    closeText="Close"
    smallScreen
  >
    This is a short notification text.
  </Notification>
  <Notification
    closeText="Close"
    headingText="Notification heading"
    headingVariant="h3"
    actionElements={
      <>
        <Button>
          Button with long description that might/may span multiple
          lines
        </Button>
        <Button variant="secondary">
          Secondary button with long description that might/may span
          multiple lines
        </Button>
      </>
    }
  >
    <Paragraph style={{ fontSize: '16px' }}>
      This is a short notification text.
    </Paragraph>
    <Paragraph style={{ fontSize: '16px' }}>
      This is a long notification text. Et turpis eget tempor. Nam sed
      lacus ut lorem feugiat tincidunt. Mauris quis nisi placerat,
      convallis turpis nec, auctor massa. Nam ornare tortor id tortor
      tristique.
    </Paragraph>
  </Notification>
</>;
```
