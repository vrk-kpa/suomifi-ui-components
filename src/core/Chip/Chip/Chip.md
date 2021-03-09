```js
import { Chip } from 'suomifi-ui-components';
import React from 'react';

const removeAction = () => {
  alert('Selection removed');
};

const exampleRef = React.createRef();

<>
  <div>
    <span style={{ marginRight: '10px' }}>
      <Chip
        removable
        actionLabel="Deselect item"
        onClick={removeAction}
      >
        Removable chip
      </Chip>
    </span>

    <Chip
      removable
      actionLabel="Log referenced element"
      ref={exampleRef}
      onClick={() => console.log(exampleRef.current)}
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
    Chip with a long content that doesn't fit into the component's
    maximum width of 290px
  </Chip>

  <Chip disabled>Disabled chip</Chip>
</>;
```
