```js
import { Block } from 'suomifi-ui-components';

<Block>Oh I'm plain suomifi-div</Block>;
```

```js
import { Block } from 'suomifi-ui-components';
import { createRef } from 'react';

const exampleRef = createRef();

<Block ref={exampleRef}>Block with ref</Block>;
```

```js
import { Block } from 'suomifi-ui-components';

<Block padding="xxxl" style={{ border: '1px solid red' }}>
  Block with xl-padding
</Block>;
```

```js
import { Block } from 'suomifi-ui-components';

<Block
  pt="s"
  pr="l"
  pb="xxl"
  pl="xxxl"
  style={{ border: '1px solid red' }}
>
  Block with indepedent paddings on each side
</Block>;
```

```js
import { Block } from 'suomifi-ui-components';

<>
  <Block variant="section">I'm semantically a section</Block>
  <Block variant="span">
    Block component rendered as an inline-block span
  </Block>
</>;
```
