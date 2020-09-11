```js
import { Chip } from 'suomifi-ui-components';

const removeAction = () => {
  alert('Selection removed');
};

<>
  <div styles={{ display: 'inline' }}>
    <Chip removable actionLabel="Unselect" onClick={removeAction}>
      Selected item 1
    </Chip>
    <Chip removable actionLabel="Unselect" onClick={removeAction}>
      Selected item 2
    </Chip>
    <Chip onClick={removeAction}>Selected item 3</Chip>
  </div>
  <Chip.static>
    <span>
      Selected item with a long content that exceeds the size limit
    </span>
  </Chip.static>
</>;
```
