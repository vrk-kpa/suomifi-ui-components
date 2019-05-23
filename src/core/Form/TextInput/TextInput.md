```js
import { TextInput } from 'suomifi-ui-components';

<TextInput
  onBlur={event => console.log(event.target.value)}
  labelText="Test TextInput"
/>;
```

```js
import { TextInput } from 'suomifi-ui-components';

<>
  <TextInput
    onBlur={event => console.log(event.target.value)}
    labelMode="screenreader"
    labelText="Test with hidden label"
  />
  <TextInput.error
    labelMode="screenreader"
    labelText="Error with hidden label"
    value="Error with hidden label"
  />
  <TextInput.success
    labelMode="screenreader"
    labelText="Success with hidden label"
    value="Success with hidden label"
  />
</>;
```
