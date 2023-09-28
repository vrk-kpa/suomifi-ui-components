The `<Notification>` component provides users noteworthy information about a specific part of a website or an action they made.

Notification should not be used dynamically. For dynamic use cases, use the [InlineAlert](./#/Components/InlineAlert) component instead.

Examples:

- [Basic use](./#/Components/Notification?id=basic-use)
- [Heading levels](./#/Components/Notification?id=heading-levels)
- [Action elements](./#/Components/Notification?id=action-elements)
- [Error status](./#/Components/Notification?id=error-status)
- [Small screen](./#/Components/Notification?id=small-screen)

<div style="margin-bottom: 40px">
  [Props & methods](./#/Components/Notification?id=props--methods)
</div>

### Basic use

Provide the `closeText` prop to label the close button.

If `headingText` is not provided, text content is used to label the component's `role="region"`. You can also use the `regionAriaLabel` prop to label the region explicitly.

```js
import { Notification } from 'suomifi-ui-components';
import { useState } from 'react';

const [showNotification, setShowNotification] = useState(true);

showNotification && (
  <Notification
    closeText="Close"
    headingText="Translation arrived (Swedish)"
    onCloseButtonClick={() => setShowNotification(false)}
  >
    Inspect the translation and edit it if necessary
  </Notification>
);
```

### Heading levels

Use the `headingVariant` prop to change the semantics of the heading. Visual styling of the heading is fixed.

```js
import { Notification } from 'suomifi-ui-components';
import { useState } from 'react';

const [showNotification, setShowNotification] = useState(true);

showNotification && (
  <Notification
    closeText="Close"
    headingText="Translation arrived (Swedish)"
    headingVariant="h4"
  >
    Inspect the translation and edit it if necessary
  </Notification>
);
```

### Action elements

Use the `actionElements` prop to render interactive elements below the component's main text content.

```js
import { Notification, Button } from 'suomifi-ui-components';
import { useState } from 'react';

const [showNotification, setShowNotification] = useState(true);

showNotification && (
  <Notification
    closeText="Close"
    headingText="Translation arrived (Swedish)"
    actionElements={
      <Button variant="secondary">Inspect translation</Button>
    }
  >
    Inspect the translation and edit it if necessary
  </Notification>
);
```

### Error status

Use `status="error"` to apply error styles to the Notification. Use a descripitve heading to emphasize that this is an error notification.

```js
import { Notification } from 'suomifi-ui-components';
import { useState } from 'react';

const [showNotification, setShowNotification] = useState(true);

showNotification && (
  <Notification
    closeText="Close"
    headingText="Signing is not possible"
    status="error"
  >
    You cannot sign the document with an expired identification
    document
  </Notification>
);
```

### Small screen

Use the `smallScreen` prop to toggle small screen styles.

```js
import { Notification } from 'suomifi-ui-components';
import { useState } from 'react';

const [showNotification, setShowNotification] = useState(true);

showNotification && (
  <Notification
    closeText="Close"
    headingText="Translation arrived (Swedish)"
    smallScreen
    onCloseButtonClick={() => setShowNotification(false)}
  >
    Inspect the translation and edit it if necessary
  </Notification>
);
```

### Props & methods

Notification component supports [margin props](./#/Spacing/Margin%20props) for spacing.
