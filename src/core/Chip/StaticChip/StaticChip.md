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
    Static chip with a
    reallyReallyLongWeirdWordThatNeedsToBeBrokenToFitInToTheChip and
    content that doesn't fit in one line and spans multiple lines.
  </StaticChip>
</>;
```
