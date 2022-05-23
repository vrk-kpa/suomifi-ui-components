```js
import { Checkbox } from 'suomifi-ui-components';
import React from 'react';

const exampleRef = React.createRef();

const [checked, setChecked] = React.useState(false);
<>
  <Checkbox
    defaultChecked
    hintText="This is an example hint text"
    onClick={(value) => {
      console.log(value);
    }}
  >
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
    ref={exampleRef}
    onClick={() => {
      console.log(exampleRef.current);
    }}
  >
    Checked large checkbox with a hint text and ref
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

### Checkboxes in group

```js
import { Checkbox, CheckboxGroup } from 'suomifi-ui-components';
import React from 'react';

<>
  <CheckboxGroup
    labelText="Checkboxes in group"
    groupHintText="Example hint text"
    groupStatus="error"
    groupStatusText="Example status text"
  >
    <Checkbox defaultChecked hintText="Example hint text">
      Regular checkbox that is checked and has a hint text
    </Checkbox>

    <Checkbox hintText="Example hint text">
      Regular checkbox with a hint text
    </Checkbox>

    <Checkbox>Regular checkbox</Checkbox>
  </CheckboxGroup>
</>;
```
