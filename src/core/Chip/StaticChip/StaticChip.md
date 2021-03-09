```js
import { StaticChip } from 'suomifi-ui-components';
import React from 'react';

<>
  <div>
    <span style={{ marginRight: '10px' }}>
      <StaticChip>Basic static chip</StaticChip>
    </span>
    <StaticChip disabled>Disabled static chip</StaticChip>
  </div>
  <StaticChip>
    StaticChip with a long content that doesn't fit into the
    component's maximum width of 290px
  </StaticChip>
</>;
```
