The `<Checkbox>` component is used to mark a value as selected in a form.

Examples:

- [Basic use](./#/Components/Checkbox?id=basic-use)
- [Hint text](./#/Components/Checkbox?id=hint-text)
- [Error status](./#/Components/Checkbox?id=error-status)
- [Default state](./#/Components/Checkbox?id=default-state)
- [Controlled state](./#/Components/Checkbox?id=controlled-state)
- [Disabled](./#/Components/Checkbox?id=disabled)
- [Accessing value with ref](./#/Components/Checkbox?id=accessing-value-with-ref)
- [Large checkbox](./#/Components/Checkbox?id=large-checkbox)
- [Checkboxes in group](./#/Components/Checkbox?id=checkboxes-in-group)
- [Group error status](./#/Components/Checkbox?id=group-error-status)
- [Optional input](./#/Components/Checkbox?id=optional-input)
- [Group with a tooltip](./#/Components/Checkbox?id=group-with-a-tooltip)

<div style="margin-bottom: 5px">
  [Props & methods (Checkbox)](./#/Components/Checkbox?id=props--methods)
</div>
<div style="margin-bottom: 40px">
  [Props & methods (CheckboxGroup)](./#/Components/Checkbox?id=checkboxgroup)
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

Toggle the error status of the component using the `status` and `statusText` props. The `statusText` is connected to the `<input>` using `aria-describedby` and read out to screen readers automatically upon change using `aria-live="assertive"`.

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

Use the `<CheckboxGroup>` component to place multiple Checkboxes into a group. The group is rendered as an HTML `<fieldset>`. Both `labelText` and `groupHintText` are rendered inside the `<legend>`.

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

The CheckboxGroup can have a `groupStatus` which is passed down to all children. An individual Checkbox inside the group can still have its own status which will override the group status.

Always use a descriptive `groupStatusText` with the error status. It uses `aria-live="polite"`, and will be read automatically by screen readers. The `statusText` for individual Checkboxes uses `aria-live="assertive"` and could override the group status.

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

Suomi.fi inputs are required by default, but can be marked optional using the `optionalText` property.

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

For instructions regarding how to ensure your Tooltip is accessible, please refer to the [Tooltip documentation](./#/Components/Tooltip).

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
      <Heading variant="h5" as="h2">
        Why you are being asked this information?
      </Heading>
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

### Props & methods
