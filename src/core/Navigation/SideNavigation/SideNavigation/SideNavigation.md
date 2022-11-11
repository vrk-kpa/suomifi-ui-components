### Basic usage

Please use `<RouterLink>` as the child of `<SideNavigationItem>` to get inteded CSS styles. `<RouterLink>` is polymorphic, and can be rendered as any component of your choice, for example React Router Link.

```js
import {
  SideNavigation,
  SideNavigationItem,
  RouterLink,
  ExternalLink
} from 'suomifi-ui-components';

const CustomButton = (props) => {
  const { children, ...passProps } = props;
  return <button {...passProps}>{props.children}</button>;
};

<div style={{ width: '350px' }}>
  <SideNavigation
    heading="Economy"
    icon="piggyBank"
    aria-label="Main"
  >
    <SideNavigationItem
      subLevel={1}
      content={
        <RouterLink href="/" aria-current="location">
          Personal economy
        </RouterLink>
      }
    >
      <SideNavigationItem
        subLevel={2}
        content={
          <RouterLink href="/" aria-current="location">
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

For frameworks where its internal link component is used as a wrapper for the actual link, for example NextJS, the following approach can be used:

```jsx static
<SideNavigationItem
  content={
    <NextJSLink href="/some-route" passHref>
      <RouterLink>Economy</RouterLink>
    </NextJSLink>
  }
/>
```

### Small screen variant

```js
import {
  SideNavigation,
  SideNavigationItem,
  RouterLink,
  ExternalLink
} from 'suomifi-ui-components';

const CustomButton = (props) => {
  const { children, ...passProps } = props;
  return <button {...passProps}>{props.children}</button>;
};

<div style={{ width: '350px' }}>
  <SideNavigation
    variant="smallScreen"
    heading="Economy"
    icon="piggyBank"
    initiallyExpanded={false}
    aria-label="Main"
  >
    <SideNavigationItem
      subLevel={1}
      content={
        <RouterLink href="/" aria-current="location">
          Personal economy
        </RouterLink>
      }
    >
      <SideNavigationItem
        subLevel={2}
        content={
          <RouterLink href="/" aria-current="location">
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
