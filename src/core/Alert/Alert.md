```js
import { Alert } from 'suomifi-ui-components';

<>
  <Alert labelText="This is a label" closeText="Sulje">
    This is an important notification!
  </Alert>
  <Alert closeText="Sulje">This is an important notification!</Alert>
  <Alert inline={true} closeText="Sulje">
    This is an inline alert!
  </Alert>
</>;
```
