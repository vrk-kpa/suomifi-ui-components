```js
import { TextInput } from 'suomifi-ui-components';
<>
  <TextInput
    onBlur={(event) => console.log(event.target.value)}
    labelText="TextInput with visible label"
    icon="search"
  />
  <TextInput
    onBlur={(event) => console.log(event.target.value)}
    labelText="Test TextInput with hidden label and a visual placeholder"
    labelMode="hidden"
    visualPlaceholder="This input has a hidden label"
  />
  <TextInput
    onBlur={(event) => console.log(event.target.value)}
    labelText="TextInput with hint text"
    hintText="An example hint text"
  />
</>;
```

```js
import { TextInput } from 'suomifi-ui-components';

<>
  <TextInput
    onBlur={(event) => console.log(event.target.value)}
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
import { TextInput, Button } from 'suomifi-ui-components';

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

  <Button onClick={() => setErrorState(!errorState)}>
    Toggle error state
  </Button>
</>;
```

```js
import { TextInput } from 'suomifi-ui-components';

<>
  <TextInput
    labelText="TextInput with numbers"
    type="number"
    defaultValue={123}
  />
  <TextInput
    labelText="TextInput with password"
    type="password"
    defaultValue="password"
  />
</>;
```
