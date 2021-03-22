```js
import { StaticChip } from 'suomifi-ui-components';
import React from 'react';

const chipStyle = {
  display: 'inline-block',
  marginRight: '10px',
  marginBottom: '24px'
};

<>
  <div>
    <StaticChip style={chipStyle}>Basic static chip</StaticChip>
    <StaticChip style={chipStyle} disabled>
      Disabled static chip
    </StaticChip>
  </div>
  <StaticChip>
    StaticChip with a long content that doesn't fit into the
    component's maximum width of 290px
  </StaticChip>
</>;
```
