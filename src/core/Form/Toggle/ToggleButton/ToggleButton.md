```js
import React, { useState } from 'react';

import { ToggleButton } from 'suomifi-ui-components';

const [checked, setChecked] = useState(false);
const testi = React.createRef();

<>
  <ToggleButton
    defaultChecked
    disabled
    ref={testi}
    onClick={() => console.log(testi.current)}
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
