Text input as basic input element for short user inputs.

Set the width to match the preferred length of the user input

Examples:

- [Basic use](/#/Components/TextInput?id=basic-use)
- [Hint text](/#/Components/TextInput?id=hint-text)
- [Controlled input](/#/Components/TextInput?id=controlled-input)
- [Optional input](/#/Components/TextInput?id=optional-input)
- [Full width input](/#/Components/TextInput?id=full-width-input)
- [Hidden label](/#/Components/TextInput?id=hidden-label)
- [Debounce and validation](/#/Components/TextInput?id=debounce-and-validation)
- [Input with icon](/#/Components/TextInput?id=input-with-icon)
- [Input type](/#/Components/TextInput?id=input-type)
- [Text input with tooltip](/#/Components/TextInput?id=textinput-with-tooltip)
- [Text input with character counter](/#/Components/TextInput?id=textinput-with-character-counter)

<div style="margin-bottom: 40px">
  <a href="/#/Components/TextInput?id=props--methods">Props & methods</a>
</div>

### Basic use

```js
import { TextInput } from 'suomifi-ui-components';
import React from 'react';

<>
  <TextInput
    onBlur={(value) => console.log(event.target.value)}
    labelText="First name"
  />
</>;
```

### Hint text

Hint text can be used to provide more detailed information about the input.

```js
import { TextInput } from 'suomifi-ui-components';

<TextInput
  labelText="New last name"
  hintText="Write the last name you wish to apply for"
/>;
```

### Controlled text input

Use the input as a controlled component by giving it a `value`

```js
import { TextInput } from 'suomifi-ui-components';
import React, { useState } from 'react';

const [inputValue, setInputValue] = useState('');

<TextInput
  onChange={(value) => setInputValue(value)}
  labelText="First name"
  value={inputValue}
/>;
```

### Optional text input

Inputs are required by default, but can be marked optional using the `optionalText` property.

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

### Disabled input

```js
import { TextInput } from 'suomifi-ui-components';

<TextInput disabled labelText="New last name" />;
```

### Hidden label

In some special cases, the label can be hidden from sighted users. This is not recommended though.

```js
import { TextInput } from 'suomifi-ui-components';

<TextInput
  onBlur={(event) => console.log(event.target.value)}
  labelMode="hidden"
  labelText="Destination"
  defaultValue="Helsinki"
/>;
```

### Debounce and validation

If you need to validate the user input using `onChange`, provide the input a debounce time so that the validation only happens after the user stops typing.

You can show a status text and provide it corresponding styles using the `status` and `statusText` properties.

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

### Input with icon

```js
import { TextInput, IconMapLocation } from 'suomifi-ui-components';

<TextInput
  labelText="Country of origin"
  icon={<IconMapLocation fill="red" />}
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

### TextInput with tooltip

A tooltip component can be given as a prop to provide a longer context or instructions where `hintText` alone would not be sufficient.

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
        Tooltip
      </Heading>
      <Text>
        If you do not have access to your birth certificate you can
        contact your local administration for identification.
      </Text>
    </Tooltip>
  }
/>;
```

### TextInput with character counter

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
    setStatusText('Description must be 20 characters or less');
  } else {
    setIsError(false);
    setStatusText('');
  }
};

<>
  <TextInput
    hintText="Please provide details pertaining to the case"
    labelText="Additional details"
    onChange={(value) => validateText(value)}
    characterLimit={maxCharAmount}
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
  ></TextInput>
</>;
```

### Props & methods
