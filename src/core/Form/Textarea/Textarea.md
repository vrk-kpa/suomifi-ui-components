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

const validateText = (text) => {
  if (text.length > 30) {
    setIsError(true);
    // Tässä yhteydessä voi myös laittaa muut mahdolliset päällä olevat virheilmoitukset samaan rimpsuun
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
    maxLength={30}
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
