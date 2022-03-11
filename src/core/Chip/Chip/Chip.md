```js
import { Chip } from 'suomifi-ui-components';
import React from 'react';

const removeAction = () => {
  alert('Selection removed');
};

const exampleRef = React.createRef();
const chipStyle = {
  display: 'inline-block',
  marginRight: '10px',
  marginBottom: '24px'
};
<>
  <div>
    <Chip
      style={chipStyle}
      removable
      actionLabel="Deselect item"
      onClick={removeAction}
    >
      Removable chip
    </Chip>
    <Chip
      style={chipStyle}
      removable
      actionLabel="Log referenced element"
      ref={exampleRef}
      onClick={() => {
        console.log(exampleRef.current);
        removeAction();
      }}
    >
      Removable chip with ref
    </Chip>
  </div>
  <div>
    <Chip onClick={removeAction}>
      Clickable chip without remove icon
    </Chip>
  </div>

  <Chip>
    Chip with a
    reallyReallyLongWeirdWordThatNeedsToBeBrokenToFitInToTheChip and
    content that doesn't fit in one line and spans multiple lines.
  </Chip>

  <Chip disabled>Disabled chip</Chip>

  <Chip aria-disabled>Aria-disabled chip</Chip>
</>;
```
