```js
import { useState } from 'react';

import { ToggleButton } from 'suomifi-ui-components';

const [checked, setChecked] = useState(false);

<>
  <ToggleButton
    defaultChecked
    disabled
    onClick={(checked) => console.log(checked)}
  >
    Checked disabled using button
  </ToggleButton>

  <ToggleButton onClick={(checked) => console.log(checked)}>
    Unchecked enabled using button
  </ToggleButton>

  <ToggleButton
    checked={checked}
    onClick={(checked) => {
      if (window.confirm('Change Toggle state?')) {
        setChecked(checked);
      }
    }}
  >
    Controlled checked state
  </ToggleButton>
</>;
```
