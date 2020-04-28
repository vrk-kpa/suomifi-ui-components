```js
import { Toggle } from 'suomifi-ui-components';
<>
  <Toggle
    defaultChecked
    disabled
    onClick={({ toggleState }) => console.log(toggleState)}
  >
    Checked disabled using button
  </Toggle>

  <Toggle.withInput
    defaultChecked
    onClick={({ toggleState }) => console.log(toggleState)}
  >
    Checked enabled using input
  </Toggle.withInput>

  <Toggle.withInput
    disabled
    onClick={({ toggleState }) => console.log(toggleState)}
  >
    Unchecked disabled using input
  </Toggle.withInput>

  <Toggle onClick={({ toggleState }) => console.log(toggleState)}>
    Unchecked enabled using button
  </Toggle>

  <Toggle
    checked={false}
    onClick={({ toggleState }) => console.log(toggleState)}
  >
    Controlled checked state.
  </Toggle>
</>;
```
