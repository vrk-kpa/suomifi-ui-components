```js
import { Checkbox } from './Checkbox';
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

  <Checkbox disabled>This is a disabled checkbox</Checkbox>

  <Checkbox
    checked={false}
    onClick={({ checkboxState }) => console.log(checkboxState)}
  >
    Checkbox with controlled checked state
  </Checkbox>
</>;
```
