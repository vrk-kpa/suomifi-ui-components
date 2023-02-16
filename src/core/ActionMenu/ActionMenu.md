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
      <ActionMenuItem>
        <RouterLink
          asComponent={CustomButton}
          onClick={() => console.log('Item xx clicked')}
        >
          Do action xx
        </RouterLink>
      </ActionMenuItem>
      <ActionMenuItem>
        <RouterLink onClick={() => console.log('Item 1 clicked')}>
          Do action 1
        </RouterLink>
      </ActionMenuItem>
      <ActionMenuDivider />
      <ActionMenuItem>
        <RouterLink
          asComponent={CustomButton}
          onClick={() => console.log('Item 2 clicked')}
        >
          Action number 4
        </RouterLink>
      </ActionMenuItem>
      <RouterLink
        asComponent={CustomButton}
        onClick={() => console.log('Item 3 clicked')}
      >
        ya ya
      </RouterLink>
      <RouterLink
        asComponent={CustomButton}
        onClick={() => console.log('Item 4 clicked')}
      >
        Settings
      </RouterLink>
    </ActionMenu>
  </div>
</>;
```
