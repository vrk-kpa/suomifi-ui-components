The `<HintText>` component creates an accessible instruction text for an adjacent element.

Under the hood, the `suomifi-ui-components` library uses this component extensively in form components.

Examples:

- [Basic use](/#/Components/HintText?id=basic-use)

<div style="margin-bottom: 40px">
  [Props & methods](/#/Components/HintText?id=props--methods)
</div>

### Basic use

Provide the id of the HintText as an `aria-describedby` value to the related component.

```js
import { HintText } from 'suomifi-ui-components';

<div>
  <label htmlFor="custom-input">Name</label>
  <HintText id="hint-text" style={{ marginBottom: '10px' }}>
    Please enter your first name
  </HintText>
  <input id="custom-input" type="text" aria-describedby="hint-text" />
</div>;
```

### Integrated hint text

Many components allow you to provide `hintText` as a prop.

```js
import { TextInput } from 'suomifi-ui-components';

<TextInput
  labelText="New last name"
  hintText="Write the last name you wish to apply for"
/>;
```

### Props & methods
