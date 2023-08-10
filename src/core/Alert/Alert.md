`<Alert>` is used at the top of a web page to convey information regarding the entire page or web service.

If you need to show dynamically appearing information regarding a more specific part of the page, use the <a href="#/Components/InlineAlert">InlineAlert</a> component instead.

Examples:

<ul>
  <li><a href="/#/Components/Alert?id=basic-use">Basic use</a></li>
  <li><a href="/#/Components/Alert?id=warning-status">Warning status</a></li>
  <li><a href="/#/Components/Alert?id=error-status">Error status</a></li>
  <li><a href="/#/Components/Alert?id=small-screen">Small screen</a></li>
</ul>

<div style="margin-bottom: 40px">
  <a href="/#/Components/Alert?id=props--methods">Props & methods</a>
</div>

### Basic use

```js
import { Alert, Block } from 'suomifi-ui-components';
import { useState } from 'react';

const [showAlert, setShowAlert] = useState(true);

showAlert && (
  <Block style={{ width: '800px' }}>
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
  <Block style={{ width: '800px' }}>
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
  <Block style={{ width: '800px' }}>
    <Alert
      status="error"
      closeText="Close"
      onCloseButtonClick={() => setShowAlert(false)}
    >
      We are currently experiencing disruptions in the service.
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
  <Block style={{ width: '800px' }}>
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
