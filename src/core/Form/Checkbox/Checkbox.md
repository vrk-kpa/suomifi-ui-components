```js
import { Checkbox } from './Checkbox';
<>
  <Checkbox
    id="1"
    defaultChecked
    hintText="This is an example hint text"
    status="checked"
  >
    This is a regular checkbox that is checked and has a hint text
  </Checkbox>

  <Checkbox
    hintText="This is an example hint text"
    status="error"
    statusText="You need to accept the terms and conditions to continue"
  >
    This is a regular checkbox with a hint text and an error message
  </Checkbox>

  <Checkbox defaultChecked disabled>
    This is a disabled checkbox
  </Checkbox>

  <Checkbox />

  <Checkbox id="2" variant="large">
    This is a large checkbox that is unchecked
  </Checkbox>

  <Checkbox
    variant="large"
    status="error"
    statusText="You need to accept the terms and conditions to continue"
    defaultChecked
  >
    This is a checked large checkbox with an error message
  </Checkbox>
</>;
```
