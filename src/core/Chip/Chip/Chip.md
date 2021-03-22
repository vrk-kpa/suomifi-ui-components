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
      onClick={() => console.log(exampleRef.current)}
    >
      Chip with ref
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
