Spacing provider is a wrapper component that allows giving its children margin rules to follow.

```js
import {
  SpacingProvider,
  Button,
  TextInput
} from 'suomifi-ui-components';
<div>
  <SpacingProvider
    margins={{
      button: { ml: 'xl', mb: 'm' },
      textInput: { mb: 'm' }
    }}
  >
    <Button>Testinappi</Button>
    <TextInput
      onBlur={(event) => console.log(event.target.value)}
      labelText="TextInput with visible label"
    />
    <TextInput
      onBlur={(event) => console.log(event.target.value)}
      labelText="TextInput with visible label"
    />
  </SpacingProvider>
</div>;
```
