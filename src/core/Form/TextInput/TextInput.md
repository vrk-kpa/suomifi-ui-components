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
    labelMode="hidden"
    labelText="Test with hidden label"
    defaultValue="Test with hidden label"
  />
  <TextInput.error
    labelMode="hidden"
    labelText="Error with hidden label"
    defaultValue="Error with hidden label"
  />
  <TextInput.success
    labelMode="hidden"
    labelText="Success with hidden label"
    defaultValue="Success with hidden label"
  />
</>;
```

```js
import { TextInput } from 'suomifi-ui-components';

const [errorState, setErrorState] = React.useState(false);
const statusText = errorState
  ? 'You entered invalid data'
  : undefined;
const variant = errorState ? 'error' : 'default';

<>
  <TextInput
    labelText="Test TextInput"
    statusText={statusText}
    variant={variant}
  />

  <button onClick={() => setErrorState(!errorState)}>
    Toggle error state
  </button>
</>;
```
