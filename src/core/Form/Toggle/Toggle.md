```js
import { Toggle } from 'suomifi-ui-components';
<>
  <Toggle onClick={({ toggleState }) => console.log(toggleState)}>
    Toggle button
  </Toggle>
  <Toggle.withInput
    onClick={({ toggleState }) => console.log(toggleState)}
  >
    Toggle input
  </Toggle.withInput>
</>;
```
