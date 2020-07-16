```js
import { Textarea } from 'suomifi-ui-components';

<>
  <Textarea
    hintText="Example hint text"
    labelText="Textarea with hint and optional texts"
    optionalText="optional"
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
    vestibulum iaculis augue, sit amet tincidunt ipsum.
  </Textarea>

  <Textarea
    labelText="Textarea with error"
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
