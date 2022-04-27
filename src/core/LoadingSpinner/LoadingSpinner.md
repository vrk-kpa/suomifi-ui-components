```js
import { LoadingSpinner } from 'suomifi-ui-components';

<>
  <div aria-live="assertive">
    <LoadingSpinner
      status="loading"
      variant="normal"
      labelAlign="right"
      labelText="Loading"
    />
    <br />
    <LoadingSpinner status="success" labelText="Loading finished" />
    <br />
    <LoadingSpinner status="failed" labelText="Loading failed" />
    <br />
    <LoadingSpinner
      status="loading"
      variant="small"
      labelMode="hidden"
      labelText="Loading"
    />
    <br />
    <LoadingSpinner
      status="success"
      variant="small"
      labelText="Loading finished"
    />
    <br />
    <LoadingSpinner
      status="failed"
      variant="small"
      labelAlign="right"
      labelText="Loading failed"
    />
  </div>
</>;
```

### LoadingSpinner in action

```js
import { useState } from 'react';

import {
  LoadingSpinner,
  VisuallyHidden
} from 'suomifi-ui-components';

const [visible, setVisible] = useState(false);
const [loaded, setLoaded] = useState(0);
const [status, setStatus] = useState('loading');

const timeout = () => {
  let progress = 0;
  const id = setInterval(frame, 300);
  function frame() {
    if (progress >= 100) {
      clearInterval(id);
      setStatus('success');
      progress = 0;
    } else {
      progress = progress + 10;
      setLoaded(progress);
    }
  }
};

<>
  <button
    onClick={() => {
      setStatus('loading');

      if (!visible) {
        timeout();
      }
      setVisible(!visible);
    }}
  >
    {visible ? 'hide spinner' : 'show spinner'}
  </button>
  <div aria-live="assertive" aria-busy={status}>
    {visible && (
      <LoadingSpinner
        status={status}
        labelText={
          status !== 'success'
            ? 'Loading ' + loaded + ' %'
            : 'Loading finished'
        }
      />
    )}
  </div>
</>;
```
