```js
import { Checkbox } from './Checkbox';
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

  <Checkbox.large>Large checkbox</Checkbox.large>

  <Checkbox.large defaultChecked hintText="Example hint text">
    Checked large checkbox with a hint text
  </Checkbox.large>

  <Checkbox disabled>Disabled checkbox</Checkbox>

  <Checkbox
    checked={checked}
    onClick={({ checkboxState }) => {
      if (confirm('Change checkbox state?'))
        setChecked(checkboxState);
    }}
  >
    Checkbox with controlled checked state
  </Checkbox>
</>;
```
