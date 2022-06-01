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
    labelText="How You want to be contacted"
    groupHintText="You can choose more than one"
    groupStatus="error"
    groupStatusText="Please choose at least one"
  >
    <Checkbox defaultChecked>By email</Checkbox>

    <Checkbox hintText="We will call at office hours (08:00 - 16:00)">
      By phone
    </Checkbox>

    <Checkbox hintText="We will knock twice">
      By personal visit
    </Checkbox>
  </CheckboxGroup>
</>;
```
