### Radio buttons in group

```js
import { RadioButton, RadioButtonGroup } from 'suomifi-ui-components';
import React from 'react';

const exampleRef = React.createRef();

<RadioButtonGroup
  labelText="RadioButtons in group"
  groupHintText="Example hint text"
  name="test-group"
  onChange={() => {
    console.log(exampleRef.current);
  }}
>
  <RadioButton ref={exampleRef} value="value-test-1">
    Choice 1
  </RadioButton>
  <RadioButton value="value-test-2">Choice 2</RadioButton>
  <RadioButton value="value-test-3">Choice 3</RadioButton>
</RadioButtonGroup>;
```

### Large radio buttons in group

```js
import { RadioButton, RadioButtonGroup } from 'suomifi-ui-components';

<RadioButtonGroup
  labelText="Large RadioButtons in group"
  groupHintText="Example hint text"
  name="test-group-large"
>
  <RadioButton variant="large" value="value-test-1">
    Large choice 1
  </RadioButton>
  <RadioButton value="value-test-2" variant="large">
    Large choice 2
  </RadioButton>
  <RadioButton
    value="value-test-3"
    variant="large"
    hintText="Example hint text"
  >
    Large choice 3
  </RadioButton>
  <RadioButton variant="large" value="value-test-4" disabled>
    Disabled large choice 4
  </RadioButton>
  <RadioButton
    variant="large"
    value="value-test-5"
    hintText="Example hint text"
    disabled
  >
    Disabled large choice 5
  </RadioButton>
</RadioButtonGroup>;
```

### Controlled radio buttons in group

```js
import { RadioButton, RadioButtonGroup } from 'suomifi-ui-components';

const [selectedValue, setSelectedValue] =
  React.useState('value-test-2');

<RadioButtonGroup
  labelText="RadioButtons in group"
  groupHintText="Example hint text"
  name="test-group-controlled"
  value={selectedValue}
  onChange={(value) => setSelectedValue(value)}
>
  <RadioButton value="value-test-1">Choice 1</RadioButton>
  <RadioButton value="value-test-2">Choice 2</RadioButton>
  <RadioButton value="value-test-3">Choice 3</RadioButton>
</RadioButtonGroup>;
```

### Standalone radio buttons

```js
import { RadioButton } from 'suomifi-ui-components';

<fieldset>
  <RadioButton
    defaultChecked={true}
    name="standalone-test"
    value="value-test-1"
  >
    Choice 1
  </RadioButton>
  <RadioButton name="standalone-test" value="value-test-2">
    Choice 2
  </RadioButton>
  <RadioButton
    name="standalone-test"
    value="value-test-3"
    hintText="Example hint text"
  >
    Choice 3
  </RadioButton>
</fieldset>;
```

### Controlled standalone radio buttons

```js
import { RadioButton } from 'suomifi-ui-components';

const [selectedValue, setSelectedValue] =
  React.useState('value-test-2');

const handleChange = (event) => {
  setSelectedValue(event.target.value);
};

<fieldset>
  <RadioButton
    name="standalone-test-controlled"
    value="value-test-1"
    checked={selectedValue === 'value-test-1'}
    onChange={handleChange}
  >
    Choice 1
  </RadioButton>
  <RadioButton
    name="standalone-test-controlled"
    value="value-test-2"
    checked={selectedValue === 'value-test-2'}
    onChange={handleChange}
  >
    Choice 2
  </RadioButton>
  <RadioButton
    name="standalone-test-controlled"
    value="value-test-3"
    hintText="Example hint text"
    checked={selectedValue === 'value-test-3'}
    onChange={handleChange}
  >
    Choice 3
  </RadioButton>
  <RadioButton
    name="standalone-test-controlled"
    value="value-test-4"
    checked={selectedValue === 'value-test-4'}
    onChange={handleChange}
    disabled
  >
    Disabled choice 4
  </RadioButton>
  <RadioButton
    name="standalone-test-controlled"
    value="value-test-5"
    hintText="Example hint text"
    checked={selectedValue === 'value-test-5'}
    onChange={handleChange}
    disabled
  >
    Disabled choice 5
  </RadioButton>
</fieldset>;
```
