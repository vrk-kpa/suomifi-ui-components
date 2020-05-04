```js
import { useState } from 'react';

import { Toggle } from 'suomifi-ui-components';

const [checked, setChecked] = useState(false);

<>
  <Toggle
    defaultChecked
    disabled
    onClick={({ toggleState }) => console.log(toggleState)}
  >
    Checked disabled using button
  </Toggle>

  <Toggle.withInput
    defaultChecked
    onClick={({ toggleState }) => console.log(toggleState)}
  >
    Checked enabled using input
  </Toggle.withInput>

  <Toggle.withInput
    disabled
    onClick={({ toggleState }) => console.log(toggleState)}
  >
    Unchecked disabled using input
  </Toggle.withInput>

  <Toggle onClick={({ toggleState }) => console.log(toggleState)}>
    Unchecked enabled using button
  </Toggle>

  <Toggle
    checked={checked}
    onClick={({ toggleState }) => {
      if (confirm('Change Toggle state?')) {
        setChecked(toggleState);
      }
    }}
  >
    Controlled checked state.
  </Toggle>
</>;
```
