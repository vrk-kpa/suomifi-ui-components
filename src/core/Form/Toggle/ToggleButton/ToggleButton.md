```js
import { useState } from 'react';

import { ToggleButton } from 'suomifi-ui-components';

const [checked, setChecked] = useState(false);

<>
  <ToggleButton
    defaultChecked
    disabled
    onClick={({ toggleState }) => console.log(toggleState)}
  >
    Checked disabled using button
  </ToggleButton>

  <ToggleButton
    onClick={({ toggleState }) => console.log(toggleState)}
  >
    Unchecked enabled using button
  </ToggleButton>

  <ToggleButton
    checked={checked}
    onClick={({ toggleState }) => {
      if (window.confirm('Change Toggle state?')) {
        setChecked(toggleState);
      }
    }}
  >
    Controlled checked state
  </ToggleButton>
</>;
```
