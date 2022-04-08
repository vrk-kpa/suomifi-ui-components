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
  setTimeout(() => {
    setLoaded(20);
    setTimeout(() => {
      setLoaded(40);
      setTimeout(() => {
        setLoaded(60);
        setTimeout(() => {
          setLoaded(80);
          setTimeout(() => {
            setLoaded(100);
            setStatus('success');
          }, 500);
        }, 500);
      }, 500);
    }, 500);
  }, 500);
};
<>
  <button
    onClick={() => {
      setStatus('loading');

      setVisible(!visible);
      timeout();
    }}
  >
    show spinner
  </button>
  <div aria-live="assertive">
    {visible && (
      <LoadingSpinner
        status={status}
        labelText={
          status !== 'success' ? (
            <span>
              <span aria-hidden="true">
                {'Loading ' + loaded + ' %'}
              </span>
              <VisuallyHidden>Loading data</VisuallyHidden>
            </span>
          ) : (
            <span>Loading finished</span>
          )
        }
      />
    )}
  </div>
</>;
```
