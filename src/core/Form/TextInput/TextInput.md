`<TextInput>` is a form component for short user inputs.

The component's width should match the preferred length of the user input.

### Accessibility Notes

- Success/error states are not distinguishable without colour.

Examples:

- [Basic use](./#/Components/TextInput?id=basic-use)
- [Hint text](./#/Components/TextInput?id=hint-text)
- [Default value](./#/Components/TextInput?id=default-value)
- [Controlled state](./#/Components/TextInput?id=controlled-state)
- [Error status](./#/Components/TextInput?id=error-status)
- [Debounce](./#/Components/TextInput?id=debounce)
- [Optional input](./#/Components/TextInput?id=optional-input)
- [Full width](./#/Components/TextInput?id=full-width)
- [Disabled](./#/Components/TextInput?id=disabled)
- [Hidden label](./#/Components/TextInput?id=hidden-label)
- [Input with icon](./#/Components/TextInput?id=input-with-icon)
- [Input type](./#/Components/TextInput?id=input-type)
- [Tooltip](./#/Components/TextInput?id=tooltip)
- [Character counter](./#/Components/TextInput?id=character-counter)

<div style="margin-bottom: 40px">
  [Props & methods](./#/Components/TextInput?id=props--methods)
</div>

### Basic use

Provide a descriptive `labelText` for the input

```js
import { TextInput } from 'suomifi-ui-components';
import React from 'react';

<TextInput labelText="First name" />;
```

### Hint text

The `hintText` prop can be used to provide more detailed information about the input

```js
import { TextInput } from 'suomifi-ui-components';

<TextInput
  labelText="New last name"
  hintText="Write the last name you wish to apply for"
/>;
```

### Default value

Set the component's initial value with the `defaultValue` prop.

```js
import { TextInput } from 'suomifi-ui-components';

<TextInput
  onBlur={(value) => console.log(event.target.value)}
  labelText="First name"
  defaultValue="Rachel"
/>;
```

### Controlled state

Access and control the input's value programmatically with the `value` prop.

A typical use case involves setting the state in the `onChange()` function.

```js
import { TextInput } from 'suomifi-ui-components';
import { useState } from 'react';

const [inputValue, setInputValue] = useState('');

<TextInput
  onChange={(value) => setInputValue(value)}
  labelText="First name"
  value={inputValue}
/>;
```

### Error status

Control the error status of the component using the `status` and `statusText` props.

```js
import { TextInput } from 'suomifi-ui-components';

const [errorState, setErrorState] = React.useState(true);
const statusText = errorState
  ? 'First name must be at least 2 characters'
  : undefined;
const status = errorState ? 'error' : 'default';

<TextInput
  labelText="First name"
  statusText={statusText}
  status={status}
  onChange={(newValue) => setErrorState(newValue.length < 2)}
/>;
```

### Debounce

You can provide the input a `debounce` time so that the `onChange()` function only runs after the user stops typing.

```js
import { TextInput } from 'suomifi-ui-components';

const [errorState, setErrorState] = React.useState(false);
const statusText = errorState
  ? 'You entered invalid data'
  : undefined;
const status = errorState ? 'error' : 'default';

<TextInput
  labelText="Place of service"
  statusText={statusText}
  status={status}
  debounce={300}
  onChange={() => {
    setErrorState(!errorState);
  }}
/>;
```

### Optional input

Suomi.fi inputs are required by default, but can be marked optional using the `optionalText` property.

```js
import { TextInput } from 'suomifi-ui-components';

<TextInput
  labelText="Secondary emergency contact name"
  optionalText="optional"
/>;
```

### Full width

When given the `fullWidth` prop, the input takes up all available horizontal space.

```js
import { TextInput } from 'suomifi-ui-components';

<TextInput
  fullWidth
  labelText="New last name"
  hintText="Write the last name you wish to apply for"
/>;
```

### Disabled

Disable the input with the `disabled` prop.

```js
import { TextInput } from 'suomifi-ui-components';

<TextInput disabled labelText="New last name" />;
```

### Hidden label

In some special cases, the label can be hidden from sighted users. This is not recommended though, and should only be done when the field already has another visually connected label. In these cases, `labelText` should match or include the visual label.

```js
import { TextInput } from 'suomifi-ui-components';

<TextInput
  onBlur={(event) => console.log(event.target.value)}
  labelMode="hidden"
  labelText="Destination"
  defaultValue="Helsinki"
/>;
```

### Input with icon

Use the `icon` prop to render an icon inside the input field

```js
import { TextInput, IconMapLocation } from 'suomifi-ui-components';

<TextInput
  labelText="Country of origin"
  icon={<IconMapLocation fill="blue" />}
/>;
```

### Input type

The component supports other input types than text as well. Using the `type` attribute you can make it, for example, a number input or a password input. The accepted values are:

- text
- number
- email
- password
- tel
- url

```js
import { TextInput } from 'suomifi-ui-components';

<>
  <TextInput labelText="Number of children" type="number" />

  <TextInput labelText="Password" type="password" />
</>;
```

### Tooltip

A `<Tooltip>` component can be used with TextInput to provide additional information.

In terms of instructive texts, Tooltip should only be used as a "last resort" when the info text is too long for `hintText`. Tooltip can be used for other nice-to-know information.

For instructions regarding how to ensure your Tooltip is accessible, please refer to the [Tooltip documentation](./#/Components/Tooltip).

```js
import {
  TextInput,
  Tooltip,
  Heading,
  Text
} from 'suomifi-ui-components';

const labelTextForTooltipExample = 'Country of origin';

<TextInput
  labelText={labelTextForTooltipExample}
  hintText="Write your country of origin as it appears on your birth certificate"
  tooltipComponent={
    <Tooltip
      ariaToggleButtonLabelText={`${labelTextForTooltipExample}, additional information`}
      ariaCloseButtonLabelText={`${labelTextForTooltipExample}, close additional information`}
    >
      <Heading variant="h5" as="h2">
        If you don't have a birth certificate
      </Heading>
      <Text>
        If you do not have access to your birth certificate you can
        contact your local administration for identification.
      </Text>
    </Tooltip>
  }
/>;
```

### Character counter

Use the `characterLimit`, `ariaCharactersRemainingText` and `ariaCharactersExceededText` props as shown below to apply a character counter to the input

```js
import { TextInput } from 'suomifi-ui-components';
import React, { useState } from 'react';

const [isError, setIsError] = useState(false);
const [statusText, setStatusText] = useState('');

const maxCharAmount = 20;

/**
 * Check if maximum amount of characters has exceed, and set status and statusText accordingly.
 * You can also add any other desired input validation rules here.
 */
const validateText = (text) => {
  if (text.length > maxCharAmount) {
    setIsError(true);
    setStatusText('Identifier must be 20 characters or less');
  } else {
    setIsError(false);
    setStatusText('');
  }
};

<>
  <TextInput
    hintText="Provide a unique identifier for your item"
    labelText="Identifier"
    onChange={(value) => validateText(value)}
    ariaCharactersRemainingText={(amount) =>
      `You have ${amount} characters remaining`
    }
    ariaCharactersExceededText={(amount) =>
      `You have ${amount} characters too many`
    }
    statusText={statusText}
    status={isError ? 'error' : 'default'}
    fullWidth
    debounce={300}
    defaultValue="Lorem ipsum dolor"
    characterLimit={maxCharAmount}
  ></TextInput>
</>;
```

### Props & methods

TextInput component supports [margin props](./#/Spacing/Margin%20props) for spacing.
