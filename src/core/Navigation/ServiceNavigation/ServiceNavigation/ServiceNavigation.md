The `<ServiceNavigation>` component can be used as a navigation element on web pages. Intended use cases include web apps and sites where all links are hierarchically on the same level.

If you need to navigate through multiple levels of page hierarchies, use the use the [SideNavigation](#/Components/SideNavigation) component instead.

Examples:

<ul>
  <li><a href="/#/Components/ServiceNavigation?id=basic-use">Basic use</a></li>
  <li><a href="/#/Components/ServiceNavigation?id=small-screen">Small screen</a></li>
  <li><a href="/#/Components/ServiceNavigation?id=disabled-items">Disabled items</a></li>
  <li><a href="/#/Components/ServiceNavigation?id=using-with-frameworks">Using with frameworks</a></li>
</ul>

<div style="margin-bottom: 5px">
  <a href="/#/Components/ServiceNavigation?id=props--methods">Props & methods (ServiceNavigation)</a>
</div>
<div style="margin-bottom: 40px">
  <a href="/#/Components/ServiceNavigation?id=servicenavigationitem">Props & methods (ServiceNavigationItem)</a>
</div>

### Basic use

- Compose the navigation with `<ServiceNavigationItem>` components.
- Use `<RouterLink>` as the child of ServiceNavigationItem to get inteded CSS styles. `<RouterLink>` is polymorphic, and can be rendered as any component of your choice, for example React Router Link.
- Set a name for the navigation element using `aria-label`. Don't use the word "navigation" since it will be read by screen readers regardless.
- Selected nav item can be marked with the `selected` prop. The RouterLink component inside should also have `aria-current="page"`

```js
import {
  ServiceNavigation,
  ServiceNavigationItem,
  RouterLink,
  ExternalLink,
  StaticChip
} from 'suomifi-ui-components';

const CustomButton = (props) => {
  const { children, ...passProps } = props;
  return <button {...passProps}>{props.children}</button>;
};

<div style={{ width: '300px' }}>
  <ServiceNavigation aria-label="Main">
    <ServiceNavigationItem>
      <RouterLink href="/" aria-label="Inbox. 16 unread messages.">
        Inbox
        <StaticChip style={{ marginLeft: '15px' }} aria-hidden>
          16
        </StaticChip>
      </RouterLink>
    </ServiceNavigationItem>
    <ServiceNavigationItem>
      <RouterLink
        asComponent={ExternalLink}
        href="https://suomi.fi"
        hideIcon
      >
        Sent
      </RouterLink>
    </ServiceNavigationItem>
    <ServiceNavigationItem selected>
      <RouterLink
        asComponent={ExternalLink}
        href="https://www.suomi.fi"
        hideIcon
        aria-current="page"
      >
        Drafts
      </RouterLink>
    </ServiceNavigationItem>
    <ServiceNavigationItem>
      <RouterLink
        asComponent={CustomButton}
        onClick={() => console.log('Nav item clicked')}
      >
        Settings
      </RouterLink>
    </ServiceNavigationItem>
    <ServiceNavigationItem>
      <RouterLink
        asComponent={ExternalLink}
        href="https://www.suomi.fi"
        hideIcon
      >
        Devices
      </RouterLink>
    </ServiceNavigationItem>
  </ServiceNavigation>
</div>;
```

### Small screen

- Apply `variant="smallScreen"` to get mobile screen styles. This includes a toggle button to show/hide the menu.
- Provide a descriptive `smallScreenExpandButtonText` for the toggle button.
- Control the menu's initially opened state with the `initiallyExpanded` prop.

```js
import {
  ServiceNavigation,
  ServiceNavigationItem,
  RouterLink,
  ExternalLink,
  StaticChip
} from 'suomifi-ui-components';

const Comp = (props) => {
  const { children, ...passProps } = props;
  return <div {...passProps}>{props.children}</div>;
};

<div style={{ width: '300px' }}>
  <ServiceNavigation
    variant="smallScreen"
    smallScreenExpandButtonText="Menu"
    initiallyExpanded={false}
    aria-label="Main"
  >
    <ServiceNavigationItem>
      <RouterLink href="/">Inbox</RouterLink>
    </ServiceNavigationItem>
    <ServiceNavigationItem>
      <RouterLink
        asComponent={ExternalLink}
        href="https://suomi.fi"
        hideIcon
      >
        Sent
      </RouterLink>
    </ServiceNavigationItem>
    <ServiceNavigationItem selected>
      <RouterLink
        asComponent={ExternalLink}
        href="https://www.suomi.fi"
        hideIcon
        aria-current="page"
        aria-label="Drafts. 3 drafts waiting."
      >
        Drafts
        <StaticChip style={{ marginLeft: '15px' }} aria-hidden>
          3
        </StaticChip>
      </RouterLink>
    </ServiceNavigationItem>
    <ServiceNavigationItem>
      <RouterLink
        asComponent={Comp}
        onClick={() => console.log('Nav item clicked')}
        role="button"
        tabIndex="0"
      >
        Settings
      </RouterLink>
    </ServiceNavigationItem>
    <ServiceNavigationItem>
      <RouterLink
        asComponent={ExternalLink}
        href="https://www.suomi.fi"
        hideIcon
      >
        Devices
      </RouterLink>
    </ServiceNavigationItem>
  </ServiceNavigation>
</div>;
```

### Disabled items

Apply the `disabled` prop to an individual ServiceNavigationItem to disable the item.

Set `role="link"` and `aria-disabled` for the RouterLink to allow screen reader focusability.

```js
import {
  ServiceNavigation,
  ServiceNavigationItem,
  RouterLink,
  ExternalLink,
  StaticChip
} from 'suomifi-ui-components';

const CustomButton = (props) => {
  const { children, ...passProps } = props;
  return <button {...passProps}>{props.children}</button>;
};

<div style={{ width: '300px' }}>
  <ServiceNavigation aria-label="Main">
    <ServiceNavigationItem>
      <RouterLink href="/" aria-label="Inbox. 16 unread messages.">
        Inbox
        <StaticChip style={{ marginLeft: '15px' }} aria-hidden>
          16
        </StaticChip>
      </RouterLink>
    </ServiceNavigationItem>
    <ServiceNavigationItem>
      <RouterLink
        asComponent={ExternalLink}
        href="https://suomi.fi"
        hideIcon
      >
        Sent
      </RouterLink>
    </ServiceNavigationItem>
    <ServiceNavigationItem selected>
      <RouterLink
        asComponent={ExternalLink}
        href="https://www.suomi.fi"
        hideIcon
        aria-current="page"
      >
        Drafts
      </RouterLink>
    </ServiceNavigationItem>
    <ServiceNavigationItem>
      <RouterLink
        asComponent={CustomButton}
        onClick={() => console.log('Nav item clicked')}
      >
        Settings
      </RouterLink>
    </ServiceNavigationItem>
    <ServiceNavigationItem disabled>
      <RouterLink role="link" aria-disabled>
        Devices
      </RouterLink>
    </ServiceNavigationItem>
  </ServiceNavigation>
</div>;
```

### Using with frameworks

The polymorphic `<RouterLink>` component can be rendered as a component of your choice. This should provide support for most front-end frameworks.

For frameworks where the internal link component is used as a wrapper for the actual link (for example NextJS) the following approach can be used

```jsx static
<ServiceNavigationItem>
  <NextJSLink href="/some-route" passHref>
    <RouterLink>Inbox</RouterLink>
  </NextJSLink>
</ServiceNavigationItem>
```

<div style="margin-bottom: 40px"></div>

## Props & methods
