The `<SideNavigation>` component can be used as a navigation element on web pages. It should be used on web pages where the links are arranged under multiple levels.

Note that the maximum number of nested link levels is 3.

Examples:

<ul>
  <li><a href="/#/Components/SideNavigation?id=basic-use">Basic use</a></li>
  <li><a href="/#/Components/SideNavigation?id=small-screen">Small screen</a></li>
  <li><a href="/#/Components/SideNavigation?id=disabled-items">Disabled items</a></li>
  <li><a href="/#/Components/SideNavigation?id=using-with-frameworks">Using with frameworks</a></li>
</ul>

<div style="margin-bottom: 5px">
  <a href="/#/Components/SideNavigation?id=props--methods">Props & methods (SideNavigation)</a>
</div>
<div style="margin-bottom: 40px">
  <a href="/#/Components/SideNavigation?id=Sidenavigationitem">Props & methods (SideNavigationItem)</a>
</div>

### Basic use

- Compose the navigation with `<SideNavigationItem>` components. Set the `subLevel` prop for each item (1-3).
- Use `<RouterLink>` as the `content` of SideNavigationItem to get inteded CSS styles. `<RouterLink>` is polymorphic, and can be rendered as any component of your choice, for example React Router Link.
- Provide a visible `heading` for the navigation
- You can provide an optional `icon` prop to render an icon next to the heading
- Set an accessible name for the navigation element using `aria-label`. Don't use the word "navigation" since it will be read by screen readers regardless.
- Selected nav item can be marked with the `selected` prop. Its RouterLink component should also have `aria-current="page"`

```js
import {
  SideNavigation,
  SideNavigationItem,
  RouterLink,
  ExternalLink
} from 'suomifi-ui-components';
import { IconPiggyBank } from 'suomifi-icons';

const CustomButton = (props) => {
  const { children, ...passProps } = props;
  return <button {...passProps}>{props.children}</button>;
};

<div style={{ width: '350px' }}>
  <SideNavigation
    heading="Economy"
    icon={<IconPiggyBank />}
    aria-label="Main"
  >
    <SideNavigationItem
      subLevel={1}
      content={<RouterLink href="/">Personal economy</RouterLink>}
    >
      <SideNavigationItem
        subLevel={2}
        content={
          <RouterLink href="/">
            Crisis situations in personal finances
          </RouterLink>
        }
      >
        <SideNavigationItem
          subLevel={3}
          content={
            <RouterLink href="/">
              If you are unable to pay your debts
            </RouterLink>
          }
        />
        <SideNavigationItem
          subLevel={3}
          selected
          content={
            <RouterLink href="/" aria-current="page">
              Advice on banking and insurance matters
            </RouterLink>
          }
        />
      </SideNavigationItem>
      <SideNavigationItem
        subLevel={2}
        content={
          <RouterLink href="/">Last will and testament</RouterLink>
        }
      />
    </SideNavigationItem>
    <SideNavigationItem
      subLevel={1}
      content={
        <RouterLink
          asComponent={ExternalLink}
          href="https://suomi.fi"
          hideIcon
        >
          Taxation and public economy
        </RouterLink>
      }
    />
    <SideNavigationItem
      content={
        <RouterLink
          asComponent={CustomButton}
          onClick={() => console.log('Nav item clicked')}
        >
          Consumer protection
        </RouterLink>
      }
      subLevel={1}
    />
    <SideNavigationItem
      content={
        <RouterLink
          asComponent={ExternalLink}
          href="https://suomi.fi"
          hideIcon
        >
          Finance
        </RouterLink>
      }
      subLevel={1}
    />
  </SideNavigation>
</div>;
```

### Small screen

- Apply `variant="smallScreen"` to get mobile screen styles. This includes a toggle button to show/hide the menu.
- Control the menu's initially opened state with the `initiallyExpanded` prop.

```js
import {
  SideNavigation,
  SideNavigationItem,
  RouterLink,
  ExternalLink
} from 'suomifi-ui-components';
import { IconPiggyBank } from 'suomifi-icons';

const CustomButton = (props) => {
  const { children, ...passProps } = props;
  return <button {...passProps}>{props.children}</button>;
};

<div style={{ width: '350px' }}>
  <SideNavigation
    variant="smallScreen"
    heading="Economy"
    icon={<IconPiggyBank />}
    initiallyExpanded={false}
    aria-label="Main"
  >
    <SideNavigationItem
      subLevel={1}
      content={<RouterLink href="/">Personal economy</RouterLink>}
    >
      <SideNavigationItem
        subLevel={2}
        content={
          <RouterLink href="/">
            Crisis situations in personal finances
          </RouterLink>
        }
      >
        <SideNavigationItem
          subLevel={3}
          content={
            <RouterLink href="/">
              If you are unable to pay your debts
            </RouterLink>
          }
        />
        <SideNavigationItem
          subLevel={3}
          selected
          content={
            <RouterLink href="/" aria-current="page">
              Advice on banking and insurance matters
            </RouterLink>
          }
        />
      </SideNavigationItem>
      <SideNavigationItem
        subLevel={2}
        content={
          <RouterLink href="/">Last will and testament</RouterLink>
        }
      />
    </SideNavigationItem>
    <SideNavigationItem
      subLevel={1}
      content={
        <RouterLink
          asComponent={ExternalLink}
          href="https://suomi.fi"
          hideIcon
        >
          Taxation and public economy
        </RouterLink>
      }
    />
    <SideNavigationItem
      content={
        <RouterLink
          asComponent={CustomButton}
          onClick={() => console.log('Nav item clicked')}
        >
          Consumer protection
        </RouterLink>
      }
      subLevel={1}
    />
    <SideNavigationItem
      disabled
      content={
        <RouterLink aria-disabled role="link">
          Finance
        </RouterLink>
      }
      subLevel={1}
    />
  </SideNavigation>
</div>;
```

### Disabled items

Apply the `disabled` prop to an individual SideNavigationItem to disable the item.

Set `role="link"` and `aria-disabled` for the RouterLink to allow screen reader focusability.

```js
import {
  SideNavigation,
  SideNavigationItem,
  RouterLink,
  ExternalLink
} from 'suomifi-ui-components';
import { IconPiggyBank } from 'suomifi-icons';

const CustomButton = (props) => {
  const { children, ...passProps } = props;
  return <button {...passProps}>{props.children}</button>;
};

<div style={{ width: '350px' }}>
  <SideNavigation
    heading="Economy"
    icon={<IconPiggyBank />}
    aria-label="Main"
  >
    <SideNavigationItem
      subLevel={1}
      content={<RouterLink href="/">Personal economy</RouterLink>}
    >
      <SideNavigationItem
        subLevel={2}
        content={
          <RouterLink href="/">
            Crisis situations in personal finances
          </RouterLink>
        }
      >
        <SideNavigationItem
          subLevel={3}
          content={
            <RouterLink href="/">
              If you are unable to pay your debts
            </RouterLink>
          }
        />
        <SideNavigationItem
          subLevel={3}
          selected
          content={
            <RouterLink href="/" aria-current="page">
              Advice on banking and insurance matters
            </RouterLink>
          }
        />
      </SideNavigationItem>
      <SideNavigationItem
        subLevel={2}
        content={
          <RouterLink href="/">Last will and testament</RouterLink>
        }
      />
    </SideNavigationItem>
    <SideNavigationItem
      subLevel={1}
      content={
        <RouterLink
          asComponent={ExternalLink}
          href="https://suomi.fi"
          hideIcon
        >
          Taxation and public economy
        </RouterLink>
      }
    />
    <SideNavigationItem
      content={
        <RouterLink
          asComponent={CustomButton}
          onClick={() => console.log('Nav item clicked')}
        >
          Consumer protection
        </RouterLink>
      }
      subLevel={1}
    />
    <SideNavigationItem
      disabled
      content={
        <RouterLink aria-disabled role="link">
          Finance
        </RouterLink>
      }
      subLevel={1}
    />
  </SideNavigation>
</div>;
```

### Using with frameworks

The polymorphic `<RouterLink>` component can be rendered as a component of your choice. This should provide support for most front-end frameworks.

For frameworks where the internal link component is used as a wrapper for the actual link (for example NextJS) the following approach can be used

```jsx static
<SideNavigationItem
  content={
    <NextJSLink href="/some-route" passHref>
      <RouterLink>Economy</RouterLink>
    </NextJSLink>
  }
/>
```

<div style="margin-bottom: 40px"></div>

## Props & methods
