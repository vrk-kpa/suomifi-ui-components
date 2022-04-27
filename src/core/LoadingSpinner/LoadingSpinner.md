```js
import { LoadingSpinner } from 'suomifi-ui-components';

<>
  <div aria-live="assertive">
    <LoadingSpinner
      status="loading"
      variant="normal"
      labelAlign="right"
      labelText={<span>Loading</span>}
    />
    <br />
    <LoadingSpinner
      status="success"
      labelText={<span>Loading finished</span>}
    />
    <br />
    <LoadingSpinner
      status="failed"
      labelText={<span>Loading failed</span>}
    />
    <br />
    <LoadingSpinner
      status="loading"
      variant="small"
      labelAlign="right"
      labelText={<span>Loading</span>}
    />
    <br />
    <LoadingSpinner
      status="success"
      variant="small"
      labelText={<span>Loading finished</span>}
    />
    <br />
    <LoadingSpinner
      status="failed"
      variant="small"
      labelText={<span>Loading failed</span>}
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
