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
  <TextInput
    status="error"
    labelMode="hidden"
    labelText="Error with hidden label"
    defaultValue="Error with hidden label"
  />
  <TextInput
    status="success"
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
const status = errorState ? 'error' : 'default';

<>
  <TextInput
    labelText="Test TextInput"
    statusText={statusText}
    status={status}
  />

  <button onClick={() => setErrorState(!errorState)}>
    Toggle error state
  </button>
</>;
```
