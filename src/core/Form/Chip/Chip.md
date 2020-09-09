```js
import { Chip } from 'suomifi-ui-components';

const removeAction = () => {
  alert('Selection removed');
};

<>
  <div styles={{ display: 'inline' }}>
    <Chip removable removableLabel="Unselect" onClick={removeAction}>
      Selected item 1
    </Chip>
    <Chip removable removableLabel="Unselect" onClick={removeAction}>
      Selected item 2
    </Chip>
    <Chip removable removableLabel="Unselect" onClick={removeAction}>
      Selected item 3
    </Chip>
  </div>
  <Chip>
    <span>
      Selected item with a long content that exceeds the size limit
    </span>
  </Chip>
</>;
```
