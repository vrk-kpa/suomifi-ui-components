```js
import { Checkbox } from './Checkbox';
import { Checkbox as CompCheckbox } from '../../../components/Form/Checkbox';
<>
  <Checkbox defaultChecked hintText="This is an example hint text">
    This is a regular checkbox that is checked and has a hint text
  </Checkbox>

  <Checkbox
    hintText="Example hint text"
    status="error"
    statusText="You need to accept the terms and conditions to continue"
  >
    This is a regular checkbox with a hint text and an error message
  </Checkbox>

  <Checkbox.large>This is a large checkbox</Checkbox.large>

  <Checkbox.large defaultChecked hintText="Example hint text">
    This is a checked large checkbox with a hint text
  </Checkbox.large>

  <Checkbox disabled>This is a disabled checkbox</Checkbox>

  <Checkbox
    checked={false}
    onClick={({ checkedState }) => console.log(checkedState)}
  >
    Controlled checked state.
  </Checkbox>
</>;
```
