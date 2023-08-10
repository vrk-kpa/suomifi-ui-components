Use the `<RadioButton>` component in a form to select one option out of a few options. To allow users to select multiple options, use the <a href="#/Components/Checkbox">Checkbox</a> component instead.

If you have more than a few options from which users can choose, consider using the <a href="#/Components/Dropdown">Dropdown</a> component instead.

Examples:

<ul>
  <li><a href="/#/Components/RadioButton?id=basic-use">Basic use</a></li>
  <li><a href="/#/Components/RadioButton?id=default-value">Default value</a></li>
  <li><a href="/#/Components/RadioButton?id=controlled-state">Controlled state</a></li>
  <li><a href="/#/Components/RadioButton?id=disabled">Disabled</a></li>
  <li><a href="/#/Components/RadioButton?id=large-variant">Large variant</a></li>
  <li><a href="/#/Components/RadioButton?id=optional-input">Optional input</a></li>
  <li><a href="/#/Components/RadioButton?id=standalone-radio-buttons">Standalone radio buttons</a></li>
  <li><a href="/#/Components/RadioButton?id=tooltip">Tooltip</a></li>
</ul>

<div style="margin-bottom: 5px">
  <a href="/#/Components/RadioButton?id=props--methods">Props & methods (RadioButton)</a>
</div>
<div style="margin-bottom: 40px">
  <a href="/#/Components/RadioButton?id=radiobuttongroup">Props & methods (RadioButtonGroup)</a>
</div>

### Basic use

- Wrap RadioButtons in a `<RadioButtonGroup>`
- Provide a descripive `labelText` and a `name` for the group
- Each RadioButton must have a unique `value`
- The group can have a common `groupHintText` and each RadioButton can have its own `hintText`

```js
import { RadioButton, RadioButtonGroup } from 'suomifi-ui-components';

<RadioButtonGroup
  labelText="How do you wish to be contacted?"
  groupHintText="Choose your preferred option"
  name="contact-method-1"
>
  <RadioButton value="email">By email</RadioButton>
  <RadioButton
    value="phone"
    hintText="We will call during office hours"
  >
    By phone
  </RadioButton>
  <RadioButton value="visit">By personal visit</RadioButton>
</RadioButtonGroup>;
```

### Default value

Use the `defaultValue` prop to control which RadioButton is selected by default.

```js
import { RadioButton, RadioButtonGroup } from 'suomifi-ui-components';

<RadioButtonGroup
  labelText="How do you wish to be contacted?"
  groupHintText="Choose your preferred option"
  name="contact-method-2"
  defaultValue="visit"
>
  <RadioButton value="email">By email</RadioButton>
  <RadioButton
    value="phone"
    hintText="We will call during office hours"
  >
    By phone
  </RadioButton>
  <RadioButton value="visit">By personal visit</RadioButton>
</RadioButtonGroup>;
```

### Controlled state

You can access and control the value of the RadioButtonGroup with the `value` prop.

A typical use case involves setting the state in the `onChange()` function.

```js
import { RadioButton, RadioButtonGroup } from 'suomifi-ui-components';
import { useState } from 'react';

const [controlledValue, setControlledValue] = useState('phone');

<RadioButtonGroup
  labelText="How do you wish to be contacted?"
  groupHintText="Choose your preferred option"
  name="contact-method-3"
  value={controlledValue}
  onChange={(newValue) => setControlledValue(newValue)}
>
  <RadioButton value="email">By email</RadioButton>
  <RadioButton
    value="phone"
    hintText="We will call during office hours"
  >
    By phone
  </RadioButton>
  <RadioButton value="visit">By personal visit</RadioButton>
</RadioButtonGroup>;
```

### Disabled

Individual RadioButtons can be disabled using the `disabled` prop.

```js
import { RadioButton, RadioButtonGroup } from 'suomifi-ui-components';

<RadioButtonGroup
  labelText="How do you wish to be contacted?"
  groupHintText="Choose your preferred option"
  name="contact-method-4"
>
  <RadioButton value="email">By email</RadioButton>
  <RadioButton
    value="phone"
    hintText="We will call during office hours"
  >
    By phone
  </RadioButton>
  <RadioButton value="visit" disabled>
    By personal visit
  </RadioButton>
</RadioButtonGroup>;
```

### Large variant

Use `variant="large"` on RadioButtons on smaller screen sizes.

```js
import { RadioButton, RadioButtonGroup } from 'suomifi-ui-components';

<RadioButtonGroup
  labelText="How do you wish to be contacted?"
  groupHintText="Choose your preferred option"
  name="contact-method-5"
>
  <RadioButton value="email" variant="large">
    By email
  </RadioButton>
  <RadioButton
    value="phone"
    hintText="We will call during office hours"
    variant="large"
  >
    By phone
  </RadioButton>
  <RadioButton value="visit" variant="large">
    By personal visit
  </RadioButton>
</RadioButtonGroup>;
```

### Optional input

By default, all Suomi.fi form inputs are considered required. If the input is not required, you can set the optionalText prop to mark it as such.

```js
import { RadioButton, RadioButtonGroup } from 'suomifi-ui-components';

<RadioButtonGroup
  labelText="How do you wish to be contacted?"
  groupHintText="Choose your preferred option"
  name="contact-method-6"
  optionalText="optional"
>
  <RadioButton value="email">By email</RadioButton>
  <RadioButton
    value="phone"
    hintText="We will call during office hours"
  >
    By phone
  </RadioButton>
  <RadioButton value="visit">By personal visit</RadioButton>
</RadioButtonGroup>;
```

### Standalone radio buttons

Standalone RadioButtons can be used to gain more layout control.

```js
import { RadioButton, Block, Label } from 'suomifi-ui-components';

<fieldset>
  <legend>How do you wish to be contacted?</legend>
  <div style={{ display: 'flex' }}>
    <div style={{ marginRight: '30px' }}>
      <RadioButton name="contact-method-7" value="email">
        By email
      </RadioButton>
      <RadioButton name="contact-method-7" value="phone">
        By phone
      </RadioButton>
    </div>
    <div>
      <RadioButton name="contact-method-7" value="mail">
        By mail
      </RadioButton>
      <RadioButton name="contact-method-7" value="visit">
        By personal visit
      </RadioButton>
    </div>
  </div>
</fieldset>;
```

### Tooltip

A `<Tooltip>` component can be used with the RadioButtonGroup to provide additional information.

In terms of instructive texts, Tooltip should only be used as a "last resort" when the info text is too long for `groupHintText`. Tooltip can be used for other nice-to-know information.

For instructions regarding how to ensure your Tooltip is accessible, please refer to the <a href="/#/Components/Tooltip">Tooltip documentation.</a>

```js
import {
  RadioButton,
  RadioButtonGroup,
  Tooltip,
  Text
} from 'suomifi-ui-components';

const labelText = 'How do you wish to be contacted?';

<RadioButtonGroup
  labelText={labelText}
  groupHintText="Choose your preferred option"
  name="contact-method-8"
  tooltipComponent={
    <Tooltip
      ariaToggleButtonLabelText={`${labelText}, additional information`}
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
  <RadioButton value="email">By email</RadioButton>
  <RadioButton
    value="phone"
    hintText="We will call during office hours"
  >
    By phone
  </RadioButton>
  <RadioButton value="visit">By personal visit</RadioButton>
</RadioButtonGroup>;
```

## Props & methods
