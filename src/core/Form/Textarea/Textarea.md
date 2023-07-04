```js
import {
  Textarea,
  Tooltip,
  Heading,
  Text
} from 'suomifi-ui-components';
import React, { useState } from 'react';

<>
  <Textarea
    hintText="Please provide details pertaining to the case"
    labelText="Description"
    fullWidth
  >
    Lorem ipsum dolor sit amet
  </Textarea>
</>;
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
 * You can also perform all your other validation needs here.
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
    labelText="Description"
    onChange={() => validateText(event.target.value)}
    maxLength={maxCharAmount}
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
