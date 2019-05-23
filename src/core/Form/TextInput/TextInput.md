```js
import { TextInput } from 'suomifi-ui-components';

<TextInput
  onBlur={event => console.log(event.target.value)}
  labelText="Test TextInput"
/>;
```

```js
import { TextInput } from 'suomifi-ui-components';

<TextInput
  onBlur={event => console.log(event.target.value)}
  labelMode="screenreader"
  labelText="Test with hidden label"
/>;
```
