```js
import { LoadingSpinner } from 'suomifi-ui-components';

<>
  <div>
    <LoadingSpinner
      status="loading"
      variant="normal"
      textAlign="right"
      text="Loading"
    />
    <br />
    <LoadingSpinner status="success" text="Loading finished" />
    <br />
    <LoadingSpinner status="failed" text="Loading failed" />
    <br />
    <LoadingSpinner
      status="loading"
      variant="small"
      textVisibility="hidden"
      text="Loading"
    />
    <br />
    <LoadingSpinner
      status="success"
      variant="small"
      text="Loading finished"
    />
    <br />
    <LoadingSpinner
      status="failed"
      variant="small"
      textAlign="right"
      text="Loading failed"
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

const runLoader = () => {
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
        runLoader();
      }
      setVisible(!visible);
    }}
  >
    {visible ? 'hide spinner' : 'show spinner'}
  </button>
  <div aria-live="assertive" aria-busy={status === 'loading'}>
    {visible && (
      <LoadingSpinner
        status={status}
        text={
          status !== 'success'
            ? 'Loading ' + loaded + ' %'
            : 'Loading finished'
        }
      />
    )}
  </div>
</>;
```
