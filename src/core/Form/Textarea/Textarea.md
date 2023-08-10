Textarea is a component suitable for longer user inputs.

Examples:

- [Basic use](/#/Components/Textarea?id=basic-use)
- [Hint text](/#/Components/Textarea?id=hint-text)
- [Controlled state](/#/Components/Textarea?id=controlled-state)
- [Optional input](/#/Components/Textarea?id=optional-input)
- [Full width](/#/Components/Textarea?id=full-width)
- [Resize modes](/#/Components/Textarea?id=resize-modes)
- [Status and validation](/#/Components/Textarea?id=status-and-validation)
- [Textarea with tooltip](/#/Components/Textarea?id=textarea-with-tooltip)
- [Textarea with character counter](/#/Components/Textarea?id=textarea-with-character-counter)

<div style="margin-bottom: 40px">
  <a href="/#/Components/Textarea?id=props--methods">Props & methods</a>
</div>

### Basic usage

```js
import { Textarea } from 'suomifi-ui-components';

<Textarea labelText="Additional information" />;
```

### Hint text

A hint text can be given to the component to provide a better explanation of the purpose and requirements of the input.

```js
import { Textarea } from 'suomifi-ui-components';

<Textarea
  labelText="Additional information"
  hintText="Provide any other details you want to add to your application"
/>;
```

### Controlled state

Use textarea as a controlled component by giving it a `value`

```js
import { Textarea } from 'suomifi-ui-components';
import React, { useState } from 'react';

const [inputValue, setInputValue] = useState('');

<Textarea
  onChange={(event) => setInputValue(event.target.value)}
  labelText="Additional information"
  value={inputValue}
/>;
```

### Optional input

Inputs are required by default, but can be marked optional using the `optionalText` property.

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

### Status and validation

You can show a status text and give it corresponding styles using the `status` and `statusText` properties. The preferred way for validation is upon submit.

```js
import React, { useRef } from 'react';
import { Textarea, Button } from 'suomifi-ui-components';

const [errorState, setErrorState] = React.useState(true);
const statusText = errorState
  ? 'Description of events is a required field'
  : undefined;
const status = errorState ? 'error' : 'default';

const textAreaRef = useRef();

const validateEntry = () => {
  !textAreaRef.current.value
    ? setErrorState(true)
    : setErrorState(false);
  return;
};

<>
  <Textarea
    labelText="Description of events"
    statusText={statusText}
    status={status}
    ref={textAreaRef}
  />
  <Button onClick={validateEntry}>Submit</Button>
</>;
```

### TextInput with tooltip

A tooltip component can be given as a prop to provide a longer context or instructions where `hintText` alone would not be sufficient.

```js
import {
  Textarea,
  Tooltip,
  Heading,
  HtmlUl,
  HtmlLi,
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

### TextArea with character counter

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
