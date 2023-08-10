The `<Checkbox>` component is used to mark a value as selected in a form.

Examples:

<ul>
  <li><a href="/#/Components/Checkbox?id=basic-use">Basic use</a></li>
  <li><a href="/#/Components/Checkbox?id=hint-text">Hint text</a></li>
  <li><a href="/#/Components/Checkbox?id=error-status">Error status</a></li>
  <li><a href="/#/Components/Checkbox?id=default-state">Default state</a></li>
  <li><a href="/#/Components/Checkbox?id=controlled-state">Controlled state</a></li>
  <li><a href="/#/Components/Checkbox?id=disabled">Disabled</a></li>
  <li><a href="/#/Components/Checkbox?id=accessing-value-with-ref">Accessing value with ref</a></li>
  <li><a href="/#/Components/Checkbox?id=large-checkbox">Large checkbox</a></li>
  <li><a href="/#/Components/Checkbox?id=checkboxes-in-group">Checkboxes in group</a></li>
  <li><a href="/#/Components/Checkbox?id=group-error-status">Group error status</a></li>
  <li><a href="/#/Components/Checkbox?id=optional-input">Optional input</a></li>
  <li><a href="/#/Components/Checkbox?id=group-with-a-tooltip">Group with a tooltip</a></li>
</ul>

<div style="margin-bottom: 5px">
  <a href="/#/Components/Checkbox?id=props--methods">Props & methods (Checkbox)</a>
</div>
<div style="margin-bottom: 40px">
  <a href="/#/Components/Checkbox?id=checkboxgroup">Props & methods (CheckboxGroup)</a>
</div>

### Basic use

```js
import { Checkbox } from 'suomifi-ui-components';

<Checkbox>I accept the terms & conditions</Checkbox>;
```

### Hint text

Use the `hintText` prop to provide additional information about the field

```js
import { Checkbox } from 'suomifi-ui-components';

<Checkbox hintText="Choose this if you need personalized assistance">
  I wish to be contacted regularly
</Checkbox>;
```

### Error status

Toggle the error status of the component using the `status` and `statusText` props.

```js
import { Checkbox } from 'suomifi-ui-components';

<Checkbox status="error" statusText="This field is required">
  I accept the terms & conditions
</Checkbox>;
```

### Default state

The initial state of the component can be set with the `defaultChecked` prop.

```js
import { Checkbox } from 'suomifi-ui-components';

<Checkbox defaultChecked>I accept the terms & conditions</Checkbox>;
```

### Controlled state

The state of the component can be accessed and controlled programmatically using the `checked` prop.

A typical use case involves setting the state manually in the `onClick()` function.

```js
import { Checkbox } from 'suomifi-ui-components';
import { useState } from 'react';

const [checked, setChecked] = useState(false);

<Checkbox
  checked={checked}
  onClick={(newState) => {
    setChecked(newState.checkboxState);
  }}
>
  I wish to be contacted regularly
</Checkbox>;
```

### Disabled

You can disable the component with the `disabled` prop. A Checkbox could be disabled when the user has not yet performed some other required action.

```js
import { Checkbox } from 'suomifi-ui-components';

<Checkbox disabled>I accept the terms & conditions</Checkbox>;
```

### Accessing value with ref

The value of a Checkbox can be accessed using React ref.

```js
import { Checkbox } from 'suomifi-ui-components';
import { useRef } from 'react';

const checkboxRef = useRef();

<Checkbox
  ref={checkboxRef}
  onClick={() => console.log(checkboxRef.current.checked)}
>
  I accept the terms & conditions
</Checkbox>;
```

### Large checkbox

Use `variant="large"` on smaller screen sizes.

```js
import { Checkbox } from 'suomifi-ui-components';

<Checkbox variant="large">I accept the terms & conditions</Checkbox>;
```

### Checkboxes in group

Use the `<ChexboxGroup>` component to place multiple Checboxes into a group.

The group can have a common `groupHintText`, and an individual Checkbox inside the group can have its own `hintText`

If you only allow the user to select a single option, use the <a href="#/Components/RadioButton">RadioButton</a> component instead.

```js
import { Checkbox, CheckboxGroup } from 'suomifi-ui-components';
import React from 'react';

<CheckboxGroup
  labelText="How do you wish to be contacted?"
  groupHintText="You can choose more than one option"
>
  <Checkbox defaultChecked>By email</Checkbox>

  <Checkbox hintText="We will call during office hours">
    By phone
  </Checkbox>

  <Checkbox>By personal visit</Checkbox>
</CheckboxGroup>;
```

### Group error status

The ChexboxGroup can have a `groupStatus` which is passed down to all children. An individual Checkbox inside the group can still have its own status which will override the group status.

Always use a descriptive `groupStatusText` with the error status.

```js
import { Checkbox, CheckboxGroup } from 'suomifi-ui-components';
import React from 'react';

<CheckboxGroup
  labelText="How do you wish to be contacted?"
  groupHintText="You can choose more than one option"
  groupStatus="error"
  groupStatusText="Please choose at least one option"
>
  <Checkbox>By email</Checkbox>

  <Checkbox hintText="We will call during office hours">
    By phone
  </Checkbox>

  <Checkbox>By personal visit</Checkbox>
</CheckboxGroup>;
```

### Optional input

By default, all Suomi.fi form inputs are considered required. If the input is not required, you can set the `optionalText` prop to mark it as such.

```js
import { Checkbox, CheckboxGroup } from 'suomifi-ui-components';
import React from 'react';

<CheckboxGroup
  labelText="How do you wish to be contacted?"
  groupHintText="You can choose more than one option"
  optionalText="Optional"
>
  <Checkbox defaultChecked>By email</Checkbox>

  <Checkbox hintText="We will call during office hours">
    By phone
  </Checkbox>

  <Checkbox>By personal visit</Checkbox>
</CheckboxGroup>;
```

### Group with a tooltip

A `<Tooltip>` component can be used with the CheckboxGroup to provide additional information.

In terms of instructive texts, Tooltip should only be used as a "last resort" when the info text is too long for `groupHintText`. Tooltip can be used for other nice-to-know information.

For instructions regarding how to ensure your Tooltip is accessible, please refer to the <a href="/#/Components/Tooltip">Tooltip documentation.</a>

```js
import {
  Checkbox,
  CheckboxGroup,
  Tooltip,
  Heading,
  Text
} from 'suomifi-ui-components';

const labelText = 'How do you wish to be contacted?';

<CheckboxGroup
  labelText={labelText}
  groupHintText="You can choose more than one option"
  tooltipComponent={
    <Tooltip
      ariaToggleButtonLabelText={`${labelText}, show additional information`}
      ariaCloseButtonLabelText={`${labelText}, close additional information`}
    >
      <Text>
        Your contact information is used only to contact you in
        matters regarding the application process, and is not shared
        between third parties. More information about handling of
        personal data is available in service privacy policies.
      </Text>
    </Tooltip>
  }
>
  <Checkbox defaultChecked>By email</Checkbox>

  <Checkbox hintText="We will call during office hours">
    By phone
  </Checkbox>

  <Checkbox>By personal visit</Checkbox>
</CheckboxGroup>;
```

## Props & methods
