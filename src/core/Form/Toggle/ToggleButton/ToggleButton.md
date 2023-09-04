`<ToggleButton>` is a toggle switch that is semantically a button. It can be used to switch between two mutually exclusive states or actions. The state of the button is communicated to assistive technology using `aria-pressed`.

Do not replace [Checkbox](./#/Components/Checkbox) with toggle.

Examples:

- [Basic use](./#/Components/Toggle?id=basic-use)
- [Default state](./#/Components/Toggle?id=default-state)
- [Controlled state](./#/Components/Toggle?id=controlled-state)
- [Disabled toggle](./#/Components/Toggle?id=disabled-toggle)
- [Toggle with input](./#/Components/Toggle?id=toggle-with-input)
- [Accessing value with ref](./#/Components/Toggle?id=accessing-value-with-ref)

<div style="margin-bottom: 5px">
  [Props & methods (ToggleButton)](./#/Components/Toggle?id=props--methods)
</div>
<div style="margin-bottom: 40px">
  [Props & methods (ToggleInput)](./#/Components/Toggle?id=toggleinput)
</div>

### Basic use

```js
import { ToggleButton } from 'suomifi-ui-components';

<ToggleButton onClick={(checked) => console.log(checked)}>
  Airplane mode
</ToggleButton>;
```

### Default state

The initial state of the component can be set with the `defaultChecked` prop.

```js
import { ToggleButton } from 'suomifi-ui-components';

<ToggleButton
  onClick={(checked) => console.log(checked)}
  defaultChecked
>
  Airplane mode
</ToggleButton>;
```

### Controlled state

Use the `checked` prop to access and control the component's state programmatically.

A typical use case involves setting the state in the `onClick()` function.

```js
import { ToggleButton } from 'suomifi-ui-components';
import { useState } from 'react';

const [checked, setChecked] = useState(false);

<ToggleButton
  checked={checked}
  onClick={(checked) => setChecked(checked)}
>
  Airplane mode
</ToggleButton>;
```

### Disabled toggle

The component can be disabled with the `disabled` prop.

```js
import { ToggleButton } from 'suomifi-ui-components';

<ToggleButton disabled>Airplane mode</ToggleButton>;
```

### Toggle with input

`<ToggleInput>` is a variant of toggle, where the underlying element is a checkbox type input instead of a button. It provides the same functionalities as `<ToggleButton>` but with a slightly different API.

```js
import { ToggleInput } from 'suomifi-ui-components';
import { useState } from 'react';

const [checked, setChecked] = useState(false);

<>
  <ToggleInput
    defaultChecked
    onChange={(value) => console.log(value)}
  >
    ToggleInput with default checked value
  </ToggleInput>

  <ToggleInput disabled onChange={(checked) => console.log(checked)}>
    Disabled ToggleInput
  </ToggleInput>

  <ToggleInput
    checked={checked}
    onChange={(checked) => {
      if (window.confirm('Change Toggle state?')) {
        setChecked(checked);
      }
    }}
  >
    Controlled checked state
  </ToggleInput>
</>;
```

### Accessing value with ref

ToggleInput supports `ref` attribute, which can be used to access its value.

```js
import { ToggleInput } from 'suomifi-ui-components';

const exampleRef = React.createRef();

<ToggleInput
  onClick={(checked) => console.log(exampleRef.current.checked)}
  ref={exampleRef}
>
  Airplane mode
</ToggleInput>;
```

### Props & methods
