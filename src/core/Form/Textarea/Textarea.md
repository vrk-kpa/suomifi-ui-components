```js
import { Textarea } from 'suomifi-ui-components';
import React from 'react';

const exampleRef = React.createRef();
<>
  <Textarea
    hintText="Example hint text"
    labelText="Textarea with hint and optional texts"
    optionalText="optional"
    ref={exampleRef}
    onChange={() => {
      console.log(exampleRef.current);
    }}
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
    vestibulum iaculis augue, sit amet tincidunt ipsum.
  </Textarea>

  <Textarea
    labelText="Textarea with error and status text"
    statusText="Something is wrong!"
    status="error"
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
    vestibulum iaculis augue, sit amet tincidunt ipsum.
  </Textarea>

  <Textarea labelText="Textarea disabled" disabled>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
    vestibulum iaculis augue, sit amet tincidunt ipsum.
  </Textarea>
</>;
```

### resize

```js
import { Textarea } from 'suomifi-ui-components';

<>
  <Textarea
    labelText="Textarea resizable only horizontally"
    resize="horizontal"
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
    vestibulum iaculis augue, sit amet tincidunt ipsum.
  </Textarea>

  <Textarea
    labelText="Textarea resizable horizontally and vertically"
    resize="both"
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
    vestibulum iaculis augue, sit amet tincidunt ipsum.
  </Textarea>

  <Textarea labelText="Textarea non-resizable" resize="none">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
    vestibulum iaculis augue, sit amet tincidunt ipsum.
  </Textarea>
</>;
```

```js
import { Textarea } from 'suomifi-ui-components';

<>
  <Textarea labelText="Textarea with 100% width" fullWidth>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
    vestibulum iaculis augue, sit amet tincidunt ipsum.
  </Textarea>

  <Textarea
    labelText="Textarea with fixed width of 250px"
    containerProps={{ style: { width: '250px' } }}
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
    vestibulum iaculis augue, sit amet tincidunt ipsum.
  </Textarea>
</>;
```

### With Tooltip

```js
import { Textarea, Tooltip } from 'suomifi-ui-components';

const labelText = 'Feedback';

<Textarea
  fullWidth
  hintText="Be constructive with your feedback"
  labelText={labelText}
  optionalText="optional"
  tooltipComponent={
    <Tooltip
      ariaToggleButtonLabelText={`${labelText}, show additional information`}
      ariaCloseButtonLabelText={`${labelText}, close additional information`}
    >
      You can write your feedback to textarea below. Do not write any
      sensitive or personal information, e.g phone number or credit
      card number.
    </Tooltip>
  }
>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
  vestibulum iaculis augue, sit amet tincidunt ipsum.
</Textarea>;
```
