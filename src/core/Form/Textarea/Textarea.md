```js
import {
  Textarea,
  Tooltip,
  Heading,
  Text
} from 'suomifi-ui-components';
import React from 'react';

const exampleRef = React.createRef();

const labelTextForTooltipExample = 'Textarea with a tooltip';

<>
  <Textarea
    hintText="Plase provide details pertaining to the case"
    labelText="Description"
    ref={exampleRef}
    onChange={() => {
      console.log(exampleRef.current);
    }}
    maxLength={30}
    ariaCharactersRemainingText={(amount) =>
      `You have ${amount} characters remaining`
    }
    ariaCharactersExceededText={(amount) =>
      `You have ${amount} characters too many`
    }
    fullWidth
  >
    Lorem ipsum dolor sit amet
  </Textarea>
</>;
```
