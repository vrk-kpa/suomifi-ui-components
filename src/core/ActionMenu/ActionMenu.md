### Default ActionMenu

```js
import {
  ActionMenu,
  RouterLink,
  ActionMenuDivider,
  ActionMenuItem
} from 'suomifi-ui-components';
import React from 'react';

const CustomButton = (props) => {
  const { children, ...passProps } = props;
  return <button {...passProps}>{props.children}</button>;
};

<>
  <ActionMenuDivider />
  <div style={{ marginLeft: '200px' }}>
    <ActionMenu buttonText="my menu">
      <ActionMenuItem>sdfsdf </ActionMenuItem>

      <RouterLink
        asComponent={CustomButton}
        onClick={() => console.log('Nav item 1 clicked')}
      >
        Do action 1
      </RouterLink>
      <ActionMenuDivider />
      <RouterLink
        asComponent={CustomButton}
        onClick={() => console.log('Nav item 2 clicked')}
      >
        Action number 4
      </RouterLink>
      <RouterLink
        asComponent={CustomButton}
        onClick={() => console.log('Nav item 3 clicked')}
      >
        ya ya
      </RouterLink>
      <RouterLink
        asComponent={CustomButton}
        onClick={() => console.log('Nav item 4 clicked')}
      >
        Settings
      </RouterLink>
    </ActionMenu>
  </div>
</>;
```
