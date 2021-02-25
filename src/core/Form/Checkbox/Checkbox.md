```js
import { Checkbox } from 'suomifi-ui-components';
import { useState } from 'react';

const [checked, setChecked] = useState(false);
<>
  <Checkbox defaultChecked hintText="This is an example hint text">
    Regular checkbox that is checked and has a hint text
  </Checkbox>

  <Checkbox
    hintText="Example hint text"
    status="error"
    statusText="You need to accept the terms and conditions to continue"
  >
    Regular checkbox with a hint text and an error message
  </Checkbox>

  <Checkbox variant="large">Large checkbox</Checkbox>

  <Checkbox
    variant="large"
    defaultChecked
    hintText="Example hint text"
  >
    Checked large checkbox with a hint text
  </Checkbox>

  <Checkbox disabled>Disabled checkbox</Checkbox>

  <Checkbox
    checked={checked}
    onClick={({ checkboxState }) => {
      if (window.confirm('Change checkbox state?')) {
        setChecked(checkboxState);
      }
    }}
  >
    Checkbox with controlled checked state
  </Checkbox>
</>;
```
