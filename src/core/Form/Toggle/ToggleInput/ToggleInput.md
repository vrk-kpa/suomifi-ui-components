```js
import { useState } from 'react';

import { ToggleInput } from 'suomifi-ui-components';

const [checked, setChecked] = useState(false);

<>
  <ToggleInput
    defaultChecked
    onChange={(checked) => console.log(checked)}
  >
    Checked enabled using input
  </ToggleInput>

  <ToggleInput disabled onChange={(checked) => console.log(checked)}>
    Unchecked disabled using input
  </ToggleInput>

  <ToggleInput
    checked={checked}
    onChange={(checked) => {
      if (window.confirm('Change Toggle state?')) {
        setChecked(checked);
      }
    }}
  >
    Controlled checked state
  </ToggleInput>
</>;
```
