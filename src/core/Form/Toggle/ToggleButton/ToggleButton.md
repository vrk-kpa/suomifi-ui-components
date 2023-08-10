`<ToggleButton>` is a toggle switch that is semantically a button. Toggle in general can be used to switch between two mutually exclusive states or actions.

Do not replace checkbox with toggle.

Examples:

<ul>
<li>[Basic use](/#/Components/Toggle?id=basic-use)</li>
<li>[Controlled state](/#/Components/Toggle?id=controlled-state)</li>
<li>[Disabled toggle](/#/Components/Toggle?id=disabled-toggle)</li>
<li>[Toggle with input](/#/Components/Toggle?id=toggle-with-input)</li>
<li>[Accessing value with ref](/#/Components/Toggle?id=togglebutton-with-ref)</li>
</ul>

<div style="margin-bottom: 5px">
  <a href="/#/Components/Toggle?id=props--methods">Props & methods (ToggleButton)</a>
</div>
<div style="margin-bottom: 40px">
  <a href="/#/Components/Toggle?id=toggleinput">Props & methods (ToggleInput)</a>
</div>

### Basic use

```js
import { ToggleButton } from 'suomifi-ui-components';
import React from 'react';

const exampleRef = React.createRef();

<>
  <ToggleButton onClick={(checked) => console.log(checked)}>
    A default ToggleButton
  </ToggleButton>
</>;
```

### Controlled state

`<ToggleButton>` can be used as a controlled component by giving its `checked` prop a value.

```js
import React, { useState } from 'react';
import { ToggleButton } from 'suomifi-ui-components';

const [checked, setChecked] = useState(false);

<ToggleButton
  checked={checked}
  onClick={(checked) => {
    if (window.confirm('Change Toggle state?')) {
      setChecked(checked);
    }
  }}
>
  Controlled checked state
</ToggleButton>;
```

### Disabled toggle

```js
import { ToggleButton } from 'suomifi-ui-components';

<ToggleButton disabled>Disabled ToggleButton</ToggleButton>;
```

### Toggle with input

`<ToggleInput>` is a variant of toggle, where the underlying element is a checkbox type input instead of a button. It provides the same functionalities as `<ToggleButton>` but with a slightly different API.

```js
import { useState } from 'react';

import { ToggleInput } from 'suomifi-ui-components';

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
  ToggleInput with ref
</ToggleInput>;
```

### Props & methods
