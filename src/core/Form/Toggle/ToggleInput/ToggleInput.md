```js
import { useState } from 'react';

import { ToggleInput } from 'suomifi-ui-components';

const [checked, setChecked] = useState(false);

<>
  <ToggleInput
    defaultChecked
    onClick={({ toggleState }) => console.log(toggleState)}
  >
    Checked enabled using input
  </ToggleInput>

  <ToggleInput
    disabled
    onClick={({ toggleState }) => console.log(toggleState)}
  >
    Unchecked disabled using input
  </ToggleInput>

  <ToggleInput
    checked={checked}
    onClick={({ toggleState }) => {
      if (window.confirm('Change Toggle state?')) {
        setChecked(toggleState);
      }
    }}
  >
    Controlled checked state
  </ToggleInput>
</>;
```
