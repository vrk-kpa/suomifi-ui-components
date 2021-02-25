```js
import { Chip } from 'suomifi-ui-components';
import React from 'react';

const removeAction = () => {
  alert('Selection removed');
};

const testi = React.createRef();

<>
  <div>
    <span style={{ marginRight: '10px' }}>
      <Chip
        removable
        actionLabel="Deselect"
        ref={testi}
        onClick={() => console.log(testi.current)}
      >
        Removable chip 1
      </Chip>
    </span>

    <Chip removable actionLabel="Deselect" onClick={removeAction}>
      Removable chip 2
    </Chip>
  </div>
  <div>
    <Chip onClick={removeAction}>
      Clickable chip without remove icon
    </Chip>
  </div>

  <Chip variant="static">
    Static chip with a long content that doesn't fit into the
    component's maximum width of 290px
  </Chip>

  <Chip variant="static" disabled>
    Disabled static chip
  </Chip>
</>;
```
