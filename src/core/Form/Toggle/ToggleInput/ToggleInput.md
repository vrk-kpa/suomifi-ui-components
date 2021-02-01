```js
import { useState } from 'react';

import { ToggleInput } from 'suomifi-ui-components';

const [checked, setChecked] = useState(false);

<>
  <ToggleInput
    defaultChecked
    onChange={({ toggleState }) => console.log(toggleState)}
  >
    Checked enabled using input
  </ToggleInput>

  <ToggleInput
    disabled
    onChange={({ toggleState }) => console.log(toggleState)}
  >
    Unchecked disabled using input
  </ToggleInput>

  <ToggleInput
    checked={checked}
    onChange={({ toggleState }) => {
      if (window.confirm('Change Toggle state?')) {
        setChecked(toggleState);
      }
    }}
  >
    Controlled checked state
  </ToggleInput>
</>;
```
