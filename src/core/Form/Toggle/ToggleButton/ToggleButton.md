```js
import React, { useState } from 'react';
import { ToggleButton } from 'suomifi-ui-components';

const [checked, setChecked] = useState(false);
const exampleRef = React.createRef();

<>
  <ToggleButton defaultChecked disabled>
    Checked disabled using button
  </ToggleButton>

  <ToggleButton onClick={(checked) => console.log(checked)}>
    Unchecked enabled using button
  </ToggleButton>
  <ToggleButton
    onClick={(checked) => console.log(checked, exampleRef.current)}
    ref={exampleRef}
  >
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
