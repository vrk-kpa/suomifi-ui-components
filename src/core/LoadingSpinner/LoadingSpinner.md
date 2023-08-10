`<LoadingSpinner` can be shown in place of actual website content when you want to convey a state of loading or other ongoing process. The component can also be used to show the progress of the process and whether it was completed succesfully or if it failed.

LoadingSpinner should only be used if a loading time is expected to be over one second. You also need to convey information regarding the state changes of the spinner. This is typically done by wrapping the component in an `aria-live` region.

Examples:

<ul>
  <li><a href="/#/Components/LoadingSpinner?id=basic-use">Basic use</a></li>
  <li><a href="/#/Components/LoadingSpinner?id=text-alignment">Text alignment</a></li>
  <li><a href="/#/Components/LoadingSpinner?id=hidden-text">Hidden text</a></li>
  <li><a href="/#/Components/LoadingSpinner?id=success-status">Success status</a></li>
  <li><a href="/#/Components/LoadingSpinner?id=failed-status">Failed status</a></li>
  <li><a href="/#/Components/LoadingSpinner?id=small-variant">Small variant</a></li>
  <li><a href="/#/Components/LoadingSpinner?id=dynamic-progress-aria-live-and-aria-busy">Dynamic progress, aria-live and aria-busy</a></li>
</ul>

<div style="margin-bottom: 40px">
  <a href="/#/Components/LoadingSpinner?id=props--methods">Props & methods</a>
</div>

### Basic use

Provide a short, descriptive text for your loading process.

```jsx
import { LoadingSpinner } from 'suomifi-ui-components';

<LoadingSpinner text="Loading items" />;
```

### Text alignment

Align text to bottom or right side of the spinner with the `textAlign` prop.

```jsx
import { LoadingSpinner } from 'suomifi-ui-components';

<LoadingSpinner text="Loading items" textAlign="right" />;
```

### Hidden text

Set `textVisibility="hidden"` to hide the text element.

```jsx
import { LoadingSpinner } from 'suomifi-ui-components';

<LoadingSpinner text="Loading items" textVisibility="hidden" />;
```

### Success status

`status="success"` can be set when the process has successfully finished.

```jsx
import { LoadingSpinner } from 'suomifi-ui-components';

<LoadingSpinner status="success" text="Loading finished" />;
```

### Failed status

`status="failed"` can be set if the loading process fails.

```jsx
import { LoadingSpinner } from 'suomifi-ui-components';

<LoadingSpinner status="failed" text="Loading failed" />;
```

### Small variant

`variant="small"` can be used to decrease the size of the component.

```jsx
import { LoadingSpinner } from 'suomifi-ui-components';

<LoadingSpinner text="Loading items" variant="small" />;
```

### Dynamic progress, aria-live and aria-busy

In the example below you can see how to indicate the progress of the loading event and show success status at the end.

LoadingSpinner is wrapped in an `aria-live` region to let screen readers know its status, while `aria-busy` is applied when the loading process in ongoing to avoid overloading screen readers with rapidly changing information.

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
    {visible ? 'Reset' : 'Start loading'}
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

### Props & methods
