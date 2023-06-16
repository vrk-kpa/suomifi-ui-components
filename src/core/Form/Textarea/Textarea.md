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
    hintText="Plase provide details pertaining to the case"
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
    charCountScreenReaderDelay={1500}
  >
    Lorem ipsum dolor sit amet
  </Textarea>
</>;
```
