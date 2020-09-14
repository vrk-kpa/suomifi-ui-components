```js
import { Chip } from 'suomifi-ui-components';

const removeAction = () => {
  alert('Selection removed');
};

<>
  <div styles={{ display: 'inline' }}>
    <Chip
      removable
      actionLabel="Unselect"
      onClick={removeAction}
      disabled
    >
      Selected item 1
    </Chip>

    <Chip removable actionLabel="Unselect" onClick={removeAction}>
      Selected item 2
    </Chip>

    <Chip onClick={removeAction}>Selected item 3</Chip>
  </div>

  <Chip.static>
    Selected item with a long content that exceeds the size limit
  </Chip.static>

  <Chip.static disabled>Disabled static chip</Chip.static>
</>;
```
