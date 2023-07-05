```js
import {
  TextInput,
  Tooltip,
  Heading,
  Text
} from 'suomifi-ui-components';
import React from 'react';

const exampleRef = React.createRef();

const labelTextForTooltipExample = 'TextInput with a tooltip';

<>
  <TextInput
    onBlur={(event) => console.log(event.target.value)}
    labelText="TextInput with visible label"
  />
  <TextInput
    onBlur={(event) => console.log(event.target.value)}
    labelText="Test TextInput with hidden label and a visual placeholder"
    labelMode="hidden"
    visualPlaceholder="This input has a hidden label"
  />
  <TextInput
    onBlur={(event) => console.log(event.target.value)}
    labelText="TextInput with hint text"
    hintText="An example hint text"
  />
  <TextInput
    labelText="TextInput with optional text and ref"
    optionalText="optional"
    ref={exampleRef}
    onChange={() => {
      console.log(exampleRef.current);
    }}
  />
  <TextInput
    labelText={labelTextForTooltipExample}
    tooltipComponent={
      <Tooltip
        ariaToggleButtonLabelText={`${labelTextForTooltipExample}, additional information`}
        ariaCloseButtonLabelText={`${labelTextForTooltipExample}, close additional information`}
      >
        <Heading variant="h5" as="h2">
          Tooltip
        </Heading>
        <Text>Text content for the tooltip</Text>
      </Tooltip>
    }
  />
</>;
```

```js
import { TextInput } from 'suomifi-ui-components';

<>
  <TextInput
    onBlur={(event) => console.log(event.target.value)}
    labelMode="hidden"
    labelText="Test with hidden label"
    defaultValue="Test with hidden label"
  />
  <TextInput
    status="error"
    labelMode="hidden"
    labelText="Error with hidden label"
    defaultValue="Error with hidden label"
  />
  <TextInput
    status="success"
    labelMode="hidden"
    labelText="Success with hidden label"
    defaultValue="Success with hidden label"
  />
</>;
```

```js
import { TextInput, Button } from 'suomifi-ui-components';

const [errorState, setErrorState] = React.useState(false);
const statusText = errorState
  ? 'You entered invalid data'
  : undefined;
const status = errorState ? 'error' : 'default';

<TextInput
  labelText="TextInput with changing error status"
  statusText={statusText}
  status={status}
  debounce={300}
  onChange={() => {
    setErrorState(!errorState);
  }}
/>;
```

```js
import { TextInput, Button } from 'suomifi-ui-components';
<>
  <TextInput
    labelText="Test TextInput with fixed custom width of 250px"
    wrapperProps={{ style: { width: '250px' } }}
  />

  <TextInput labelText="Test TextInput with 100% width" fullWidth />
</>;
```

```js
import { TextInput } from 'suomifi-ui-components';
import { IconMapLocation } from 'suomifi-icons';

<>
  <TextInput
    labelText="TextInput with numbers"
    type="number"
    defaultValue={123}
  />
  <TextInput
    labelText="TextInput with password"
    type="password"
    defaultValue="password"
  />
  <TextInput
    onBlur={(event) => console.log(event.target.value)}
    labelText="TextInput with an icon"
    icon={<IconMapLocation fill="red" />}
  />
  <TextInput
    labelText="TextInput with debounced onChange event"
    onChange={(value) => console.log(value)}
    debounce={800}
  />
</>;
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
 * You can also perform all your other validation needs here.
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
    labelText="Description"
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
    defaultValue="Lorem ipsum dolor"
  ></TextInput>
</>;
```
