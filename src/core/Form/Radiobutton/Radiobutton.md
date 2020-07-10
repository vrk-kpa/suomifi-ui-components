```js
import { Radiobutton } from './Radiobutton';

<>
  <div>
    <Radiobutton name="test" value="value-test-1">
      Choice 1
    </Radiobutton>
    <Radiobutton name="test" value="value-test-2">
      Choice 2
    </Radiobutton>
    <Radiobutton
      name="test"
      value="value-test-3"
      hintText="Example hint text"
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
