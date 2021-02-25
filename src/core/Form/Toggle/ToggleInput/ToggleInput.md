```js
import { createRef, useState } from 'react';

import { ToggleInput } from 'suomifi-ui-components';

const [checked, setChecked] = useState(false);
const testi = createRef();
<>
  <ToggleInput
    defaultChecked
    ref={testi}
    onChange={() => console.log(testi.current)} //TODO: change back to logging checked state
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
