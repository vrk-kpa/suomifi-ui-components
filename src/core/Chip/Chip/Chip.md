```js
import { Chip } from 'suomifi-ui-components';
import React from 'react';

const exampleRef = React.createRef();

<>
  <div>
    <span style={{ marginRight: '10px' }}>
      <Chip
        removable
        actionLabel="Log referenced element"
        onClick={() => alert('Selection removed')}
      >
        Removable chip with ref
      </Chip>
    </span>

    <Chip
      removable
      actionLabel="Deselect"
      onClick={() => console.log(exampleRef.current)}
    >
      Removable chip 2
    </Chip>
  </div>
  <div>
    <Chip onClick={removeAction}>
      Clickable chip without remove icon
    </Chip>
  </div>

  <Chip>
    Chip with a long content that doesn't fit into the component's
    maximum width of 290px
  </Chip>

  <Chip disabled>Disabled chip</Chip>
</>;
```
