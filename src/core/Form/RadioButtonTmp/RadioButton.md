```js
import { RadioButton } from 'suomifi-ui-components';

<RadioButton.group
  label="RadioButtons in group"
  hintText="Example hint text"
  name="test-group"
>
  <RadioButton value="value-test-1">Choice 1</RadioButton>
  <RadioButton value="value-test-2">Choice 2</RadioButton>
  <RadioButton value="value-test-3">Choice 3</RadioButton>
</RadioButton.group>;
```

### Standalone radio buttons

```js
import { RadioButton } from 'suomifi-ui-components';

const [selectedValue, setSelectedValue] = React.useState(
  'value-test-2'
);

const handleChange = (event) => {
  setSelectedValue(event.target.value);
};

<>
  <div>
    <RadioButton
      name="test"
      value="value-test-1"
      checked={selectedValue === 'value-test-1'}
      onChange={handleChange}
    >
      Choice 1
    </RadioButton>
    <RadioButton
      name="test"
      value="value-test-2"
      checked={selectedValue === 'value-test-2'}
      onChange={handleChange}
    >
      Choice 2
    </RadioButton>
    <RadioButton
      name="test"
      value="value-test-3"
      hintText="Example hint text"
      checked={selectedValue === 'value-test-3'}
      onChange={handleChange}
    >
      Choice 3
    </RadioButton>
    <RadioButton.divider>or</RadioButton.divider>
    <RadioButton
      name="test"
      value="value-test-4"
      checked={selectedValue === 'value-test-4'}
      onChange={handleChange}
      disabled
    >
      Disabled choice 4
    </RadioButton>
    <RadioButton
      name="test"
      value="value-test-5"
      hintText="Example hint text"
      checked={selectedValue === 'value-test-5'}
      onChange={handleChange}
      disabled
    >
      Disabled choice 5
    </RadioButton>
  </div>
</>;
```

```js
import { RadioButton } from 'suomifi-ui-components';

<>
  <RadioButton.group
    label="Large RadioButtons in group"
    hintText="Example hint text"
    name="test-group-large"
  >
    <RadioButton.large value="value-test-1">
      Large choice 1
    </RadioButton.large>
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
    <RadioButton.divider variant="large">or</RadioButton.divider>
    <RadioButton.large value="value-test-4" disabled>
      Disabled large choice 4
    </RadioButton.large>
    <RadioButton.large
      value="value-test-5"
      hintText="Example hint text"
      disabled
    >
      Disabled large choice 5
    </RadioButton.large>
  </RadioButton.group>
</>;
```
