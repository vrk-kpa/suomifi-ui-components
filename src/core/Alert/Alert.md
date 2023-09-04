`<Alert>` is used at the top of a web page to convey information regarding the entire page or web service. It has the ARIA role `'alert'`, which ensures the component's content is read by screen readers immediately on page load.

If you need to show dynamically appearing information regarding a more specific part of the page, use the [InlineAlert](/#/Components/InlineAlert) component instead.

Examples:

- [Basic use](/#/Components/Alert?id=basic-use)
- [Warning status](/#/Components/Alert?id=warning-status)
- [Error status](/#/Components/Alert?id=error-status)
- [Small screen](/#/Components/Alert?id=small-screen)

<div style="margin-bottom: 40px">
  [Props & methods](/#/Components/Alert?id=props--methods)
</div>

### Basic use

```js
import { Alert, Block } from 'suomifi-ui-components';
import { useState } from 'react';

const [showAlert, setShowAlert] = useState(true);

showAlert && (
  <Block style={{ width: '900px' }}>
    <Alert
      closeText="Close"
      onCloseButtonClick={() => setShowAlert(false)}
    >
      You are using a beta version of the service. It might contain
      some bugs or glitches.
    </Alert>
  </Block>
);
```

### Warning status

The warning status of an Alert is used for conveying information which affects users but is not absolutely critical.

```js
import { Alert, Block } from 'suomifi-ui-components';
import { useState } from 'react';

const [showAlert, setShowAlert] = useState(true);

showAlert && (
  <Block style={{ width: '900px' }}>
    <Alert
      status="warning"
      closeText="Close"
      onCloseButtonClick={() => setShowAlert(false)}
    >
      The service will be temporarily unavailable on 5.6.2021 at 21.00
      – 23.59 due to maintenance.
    </Alert>
  </Block>
);
```

### Error status

The error status of an Alert is used for conveying critical issues.

```js
import { Alert, Block } from 'suomifi-ui-components';
import { useState } from 'react';

const [showAlert, setShowAlert] = useState(true);

showAlert && (
  <Block style={{ width: '900px' }}>
    <Alert
      status="error"
      closeText="Close"
      onCloseButtonClick={() => setShowAlert(false)}
    >
      We are currently experiencing disruptions in the service.
      Submitting applications is not possible.
    </Alert>
  </Block>
);
```

### Small screen

Set `smallScreen` to true on narrower screens (mobile devices).

```js
import { Alert, Block } from 'suomifi-ui-components';
import { useState } from 'react';

const [showAlert, setShowAlert] = useState(true);

showAlert && (
  <Block style={{ width: '900px' }}>
    <Alert
      smallScreen
      closeText="Close"
      onCloseButtonClick={() => setShowAlert(false)}
    >
      You are using a beta version of the service. It might contain
      some bugs or glitches.
    </Alert>
  </Block>
);
```

### Props & methods
