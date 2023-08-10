The `<HintText>` component creates an accessible instruction text for an adjacent element. Provide the id of the HintText as an `aria-describedby` value to the related component.

Under the hood, the `suomifi-ui-components` library uses this component extensively in form components.

Examples:

<ul>
  <li><a href="/#/Components/HintText?id=basic-use">Basic use</a></li>
</ul>

<div style="margin-bottom: 40px">
  <a href="/#/Components/HintText?id=props--methods">Props & methods</a>
</div>

### Basic use

```js
import { HintText } from 'suomifi-ui-components';

<div>
  <label htmlFor="custom-input">Name</label>
  <HintText id="hint-text" style={{ marginBottom: '10px' }}>
    Please enter your first and last name
  </HintText>
  <input id="custom-input" type="text" aria-describedby="hint-text" />
</div>;
```

Props & methods
