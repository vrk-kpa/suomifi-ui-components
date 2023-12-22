The `<Textarea>` component is suitable for longer user inputs.

Examples:

- [Basic use](./#/Components/Textarea?id=basic-use)
- [Hint text](./#/Components/Textarea?id=hint-text)
- [Default value](./#/Components/Textarea?id=default-value)
- [Controlled state](./#/Components/Textarea?id=controlled-state)
- [Error status](./#/Components/Textarea?id=error-status)
- [Disabled](./#/Components/Textarea?id=disabled)
- [Optional input](./#/Components/Textarea?id=optional-input)
- [Full width](./#/Components/Textarea?id=full-width)
- [Resize modes](./#/Components/Textarea?id=resize-modes)
- [Tooltip](./#/Components/Textarea?id=tooltip)
- [Character counter](./#/Components/Textarea?id=character-counter)

<div style="margin-bottom: 40px">
  [Props & methods](./#/Components/Textarea?id=props--methods)
</div>

### Accessibility Notes

- Success/error states are not distinguishable without colour.

### Basic use

Provide a descriptive `labelText` for the input

```js
import { Textarea } from 'suomifi-ui-components';

<Textarea labelText="Additional information" />;
```

### Hint text

A `hintText` can be given to the component to provide a better explanation of the purpose and requirements of the input.

```js
import { Textarea } from 'suomifi-ui-components';

<Textarea
  labelText="Additional information"
  hintText="Provide any other details you want to add to your application"
/>;
```

### Default value

Set the component's initial value by providing text as children

```js
import { TextInput } from 'suomifi-ui-components';

<Textarea
  labelText="Additional information"
  hintText="Provide any other details you want to add to your application"
>
  Lorem ipsum dolor sit amet
</Textarea>;
```

### Controlled state

Access and control the input's value programmatically with the `value` prop.

A typical use case involves setting the state in the `onChange()` function.

```js
import { Textarea } from 'suomifi-ui-components';
import { useState } from 'react';

const [inputValue, setInputValue] = useState('');

<Textarea
  onChange={(event) => setInputValue(event.target.value)}
  labelText="Additional information"
  value={inputValue}
/>;
```

### Error status

Control the error status of the component using the `status` and `statusText` props.

```js
import { Textarea } from 'suomifi-ui-components';

const [errorState, setErrorState] = React.useState(true);
const statusText = errorState
  ? 'Description is a required field'
  : undefined;
const status = errorState ? 'error' : 'default';

<Textarea
  labelText="Description"
  statusText={statusText}
  status={status}
  onChange={(event) => setErrorState(event.target.value === '')}
/>;
```

### Disabled

Disable the input with the `disabled` prop.

```js
import { Textarea } from 'suomifi-ui-components';

<Textarea labelText="Additional information" disabled />;
```

### Optional input

Suomi.fi inputs are required by default, but can be marked optional using the `optionalText` property.

```js
import { Textarea } from 'suomifi-ui-components';

<Textarea
  labelText="Additional information"
  optionalText="optional"
/>;
```

### Full width

The component can be made to take all available horizontal space by giving it the `fullWidth` property.

```js
import { Textarea } from 'suomifi-ui-components';

<Textarea
  labelText="Additional information"
  hintText="Provide any other details you want to add to your application"
  fullWidth
/>;
```

### Resize modes

Textarea can be resized vertically by default. A `resize` property can be given to control the ways the component can be resized by the user.

To allow horizontal or free resize, you must override the default container width either by styling or using the `fullWidth` prop.

```js
import { Textarea } from 'suomifi-ui-components';
<Textarea
  labelText="Additional information"
  resize="both"
  fullWidth
/>;
```

### Tooltip

A `<Tooltip>` component can be used with Textarea to provide additional information.

In terms of instructive texts, Tooltip should only be used as a "last resort" when the info text is too long for `hintText`. Tooltip can be used for other nice-to-know information.

For instructions regarding how to ensure your Tooltip is accessible, please refer to the [Tooltip documentation](./#/Components/Tooltip).

```js
import {
  Textarea,
  Tooltip,
  Heading,
  Text
} from 'suomifi-ui-components';

const labelTextForTooltipExample = 'Additional feedback';

<Textarea
  labelText={labelTextForTooltipExample}
  fullWidth
  tooltipComponent={
    <Tooltip
      ariaToggleButtonLabelText={`${labelTextForTooltipExample}, additional information`}
      ariaCloseButtonLabelText={`${labelTextForTooltipExample}, close additional information`}
    >
      <Heading variant="h5" as="h2">
        Additional feedback
      </Heading>
      <Text>Consider answering some of the following questions:</Text>
      <ul>
        <li>How was your overall experience</li>
        <li>What went well</li>
        <li>What things could've gone better and how?</li>
      </ul>
      <Text>
        We use this information in order to improve our service and it
        will not be linked to your profile.
      </Text>
    </Tooltip>
  }
/>;
```

### Character counter

- Provide the maximum length of the text to enable character counter
- Provide clear texts indicating characters remaining or exceeding the limit. They are hidden from view but exist for screen reader users.
- There is an inbuilt delay in updating the status text to make it work better for VoiceOver users

```js
import {
  Textarea,
  Tooltip,
  Heading,
  Text
} from 'suomifi-ui-components';
import React, { useState } from 'react';

const [isError, setIsError] = useState(false);
const [statusText, setStatusText] = useState('');

const maxCharAmount = 30;

/**
 * Check if maximum amount of characters has exceed, and set status and statusText accordingly.
 * You can also add any other desired input validation rules here.
 */
const validateText = (text) => {
  if (text.length > maxCharAmount) {
    setIsError(true);
    setStatusText('Description must be 30 characters or less');
  } else {
    setIsError(false);
    setStatusText('');
  }
};

<>
  <Textarea
    hintText="Please provide details pertaining to the case"
    labelText="Additional details"
    onChange={() => validateText(event.target.value)}
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
  >
    Lorem ipsum dolor sit amet
  </Textarea>
</>;
```

### Props & methods

Textarea component supports [margin props](./#/Spacing/Margin%20props) for spacing.
