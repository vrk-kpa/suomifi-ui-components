```js
import { Heading } from 'suomifi-ui-components';
import { createRef } from 'react';

const exampleRef = createRef();

<>
  <Heading variant="h1" ref={exampleRef}>
    h1 text
  </Heading>
  <Heading variant="h2">h2 text</Heading>
  <Heading variant="h3" as="h2">
    h3 as h2 text
  </Heading>
  <Heading variant="h3">h3 text</Heading>
  <Heading variant="h4">h4 text</Heading>
  <Heading variant="h5">h5 text</Heading>
  <Heading variant="h1hero">h1 text with hero styling</Heading>
  <Heading variant="h1" smallScreen>
    h1 text for small screen resolution
  </Heading>
</>;
```
