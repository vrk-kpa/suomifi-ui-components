```js
import { Radiobutton } from './Radiobutton';

<Radiobutton.group
  label="Radiobuttons in group"
  hintText="Example hint text"
  name="test-group"
>
  <Radiobutton value="value-test-1">Choice 1</Radiobutton>
  <Radiobutton value="value-test-2">Choice 2</Radiobutton>
  <Radiobutton value="value-test-3">Choice 3</Radiobutton>
</Radiobutton.group>;
```

### Standalone radio buttons

```js
import { Radiobutton } from './Radiobutton';

const [selectedValue, setSelectedValue] = React.useState(
  'value-test-2'
);

const handleChange = (event) => {
  setSelectedValue(event.target.value);
};

<>
  <div>
    <Radiobutton
      name="test"
      value="value-test-1"
      checked={selectedValue === 'value-test-1'}
      onChange={handleChange}
    >
      Choice 1
    </Radiobutton>
    <Radiobutton
      name="test"
      value="value-test-2"
      checked={selectedValue === 'value-test-2'}
      onChange={handleChange}
    >
      Choice 2
    </Radiobutton>
    <Radiobutton
      name="test"
      value="value-test-3"
      hintText="Example hint text"
      checked={selectedValue === 'value-test-3'}
      onChange={handleChange}
    >
      Choice 3
    </Radiobutton>
    <Radiobutton.divider>or</Radiobutton.divider>
    <Radiobutton
      name="test"
      value="value-test-4"
      checked={selectedValue === 'value-test-4'}
      onChange={handleChange}
      disabled
    >
      Disabled choice 4
    </Radiobutton>
    <Radiobutton
      name="test"
      value="value-test-5"
      hintText="Example hint text"
      checked={selectedValue === 'value-test-5'}
      onChange={handleChange}
      disabled
    >
      Disabled choice 5
    </Radiobutton>
  </div>
</>;
```

```js
import { Radiobutton } from './Radiobutton';

<>
  <Radiobutton.group
    label="Large Radiobuttons in group"
    hintText="Example hint text"
    name="test-group-large"
  >
    <Radiobutton.large value="value-test-1">
      Large choice 1
    </Radiobutton.large>
    <Radiobutton value="value-test-2" variant="large">
      Large choice 2
    </Radiobutton>
    <Radiobutton
      value="value-test-3"
      variant="large"
      hintText="Example hint text"
    >
      Large choice 3
    </Radiobutton>
    <Radiobutton.divider variant="large">or</Radiobutton.divider>
    <Radiobutton.large value="value-test-4" disabled>
      Disabled large choice 4
    </Radiobutton.large>
    <Radiobutton.large
      value="value-test-5"
      hintText="Example hint text"
      disabled
    >
      Disabled large choice 5
    </Radiobutton.large>
  </Radiobutton.group>
</>;
```
