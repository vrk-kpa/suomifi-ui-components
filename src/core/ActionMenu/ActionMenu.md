### Default ActionMenu

```js
import {
  ActionMenu,
  ActionMenuDivider,
  ActionMenuItem
} from 'suomifi-ui-components';
import { useState } from 'react';

const [lastAction, setLastAction] = useState('');

<>
  <div>
    <ActionMenu
      buttonText="Actions"
      onOpen={() => console.log('open')}
      onClose={() => console.log('close')}
      disabled={false}
      id="my-id"
    >
      <ActionMenuItem onClick={() => setLastAction('Copy')}>
        Copy
      </ActionMenuItem>
      <ActionMenuDivider />
      <ActionMenuItem onClick={() => setLastAction('Long')}>
        Longer name for an action
      </ActionMenuItem>
      <ActionMenuItem href="https://www.suomi.fi">
        This is a link
      </ActionMenuItem>
      <ActionMenuItem
        onClick={() => setLastAction('Remove')}
        icon="remove"
      >
        Remove
      </ActionMenuItem>
      <ActionMenuItem
        onClick={() => setLastAction('Disabled')}
        icon="reply"
        disabled
      >
        Disabled
      </ActionMenuItem>
    </ActionMenu>
  </div>
  <div>Last action: {lastAction}</div>
</>;
```

### ActionMenu with icon only

```js
import {
  ActionMenu,
  ActionMenuDivider,
  ActionMenuItem
} from 'suomifi-ui-components';
import { useState } from 'react';

const [lastAction, setLastAction] = useState('');

<>
  <div>
    <ActionMenu
      disabled={false}
      id="icon-only-id"
      aria-label="Actions"
      buttonVariant="secondaryNoBorder"
    >
      <ActionMenuItem onClick={() => setLastAction('Copy')}>
        Copy
      </ActionMenuItem>
      <ActionMenuItem
        onClick={() => setLastAction('Edit')}
        icon="edit"
      >
        Edit
      </ActionMenuItem>
      <ActionMenuItem
        onClick={() => setLastAction('Remove')}
        icon="remove"
      >
        Remove
      </ActionMenuItem>
    </ActionMenu>
  </div>
  <div>Last action: {lastAction}</div>
</>;
```

### Full width

```js
import {
  ActionMenu,
  ActionMenuDivider,
  ActionMenuItem
} from 'suomifi-ui-components';
import { useState } from 'react';

const [lastAction, setLastAction] = useState('');

<>
  <ActionMenu buttonText="Actions" id="full-id" fullWidth>
    <ActionMenuItem onClick={() => setLastAction('Copy')}>
      Copy
    </ActionMenuItem>
    <ActionMenuItem onClick={() => setLastAction('Edit')} icon="edit">
      Edit
    </ActionMenuItem>
    <ActionMenuItem onClick={() => setLastAction('Move')}>
      Move
    </ActionMenuItem>
    <ActionMenuDivider />
    <ActionMenuItem onClick={() => setLastAction('Long')}>
      Longer name for an action
    </ActionMenuItem>
    <ActionMenuItem onClick={() => setLastAction('Long')}>
      Another long name for an action
    </ActionMenuItem>
    <ActionMenuItem
      onClick={() => setLastAction('Remove')}
      icon="remove"
    >
      Remove
    </ActionMenuItem>
    <ActionMenuItem onClick={() => setLastAction('Disabled')}>
      Disabled
    </ActionMenuItem>
  </ActionMenu>

  <div>Last action: {lastAction}</div>
</>;
```
