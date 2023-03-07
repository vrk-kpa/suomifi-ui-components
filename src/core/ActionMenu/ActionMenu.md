### Default ActionMenu

```js
import {
  ActionMenu,
  RouterLink,
  ActionMenuDivider,
  ActionMenuItem,
  Button,
  Link
} from 'suomifi-ui-components';
import React from 'react';

const CustomButton = (props) => {
  const { children, ...passProps } = props;
  return <button {...passProps}>{props.children}</button>;
};

<>
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
        <RouterLink onClick={() => console.log('Item 1')}>
          Do action 1
        </RouterLink>
      </ActionMenuItem>
      <ActionMenuDivider />
      <ActionMenuItem>
        <RouterLink
          asComponent={CustomButton}
          onClick={() => console.log('Pidempi')}
        >
          Pidempi nimi toiminnolle
        </RouterLink>
      </ActionMenuItem>
      <ActionMenuItem>
        <RouterLink
          asComponent={CustomButton}
          onClick={() => console.log('Muokkaa')}
        >
          Muokkaa
        </RouterLink>
      </ActionMenuItem>
      <ActionMenuItem>
        <RouterLink
          asComponent={CustomButton}
          onClick={() => console.log('Poista')}
        >
          Poista
        </RouterLink>
      </ActionMenuItem>
    </ActionMenu>
  </div>
</>;
```
