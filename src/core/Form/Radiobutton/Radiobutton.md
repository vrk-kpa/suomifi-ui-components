```js
import { Radiobutton } from './Radiobutton';

const [selectedValue, setSelectedValue] = React.useState(
  'value-test-2'
);

const handleChange = (event) => {
  console.log(event.target.value);
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
    <Radiobutton name="test" value="value-test-4" disabled>
      Disabled choice 4
    </Radiobutton>
    <Radiobutton
      name="test"
      value="value-test-5"
      disabled
      hintText="Example hint text"
    >
      Disabled choice 5
    </Radiobutton>
  </div>
</>;
```

```js
import { Radiobutton } from './Radiobutton';

<>
  <div>
    <Radiobutton.large name="large-test" value="value-test-1">
      Large choice 1
    </Radiobutton.large>
    <Radiobutton
      name="large-test"
      value="value-test-2"
      variant="large"
    >
      Large choice 2
    </Radiobutton>
    <Radiobutton
      name="large-test"
      value="value-test-3"
      variant="large"
      hintText="Example hint text"
    >
      Large choice 3
    </Radiobutton>
    <Radiobutton.large
      name="large-test"
      value="value-test-4"
      disabled
    >
      Disabled large choice 4
    </Radiobutton.large>
    <Radiobutton.large
      name="large-test"
      value="value-test-5"
      disabled
      hintText="Example hint text"
    >
      Disabled large choice 5
    </Radiobutton.large>
  </div>
</>;
```

```js
import { Radiobutton } from './Radiobutton';

<Radiobutton.group label="Make your choice" hintText="Choose wisely">
  <Radiobutton name="test-group" value="value-test-1">
    Choice 1
  </Radiobutton>
  <Radiobutton name="test-group" value="value-test-2">
    Choice 2
  </Radiobutton>
</Radiobutton.group>;
```
