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
    hintText="Example hint text"
    labelText="Textarea with hint and optional texts"
    optionalText="optional"
    ref={exampleRef}
    onChange={() => {
      console.log(exampleRef.current);
    }}
    maxLength={100}
    ariaCharactersRemainingText={(amount) =>
      `You have ${amount} characters remaining`
    }
    ariaCharactersExceededText={(amount) =>
      `You have ${amount} characters too many`
    }
  >
    Lorem ipsum dolor sit amet
  </Textarea>
</>;
```
