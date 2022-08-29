### Basic usage

Please use `<RouterLink>` as the child of `<ServiceNavigationItem>` to get inteded CSS styles. `<RouterLink>` is polymorphic, and can be rendered as any component of your choice, for example React Router Link.

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
  <ServiceNavigation>
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
        New Message
      </RouterLink>
    </ServiceNavigationItem>
    <ServiceNavigationItem>
      <RouterLink
        asComponent={ExternalLink}
        href="https://www.suomi.fi"
        hideIcon
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
      <RouterLink>Devices</RouterLink>
    </ServiceNavigationItem>
  </ServiceNavigation>
</div>;
```

For frameworks where its internal link component is used as a wrapper for the actual link, for example NextJS, the following approach can be used:

```jsx static
<ServiceNavigationItem>
  <NextJSLink href="/some-route" passHref>
    <RouterLink>Inbox</RouterLink>
  </NextJSLink>
</ServiceNavigationItem>
```

### Small screen variant

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

const expandButtonContent = (
  <>
    <span>DRAFTS</span>
    <StaticChip style={{ marginLeft: '15px' }} aria-hidden>
      3
    </StaticChip>
  </>
);

<div style={{ width: '300px' }}>
  <ServiceNavigation
    variant="smallScreen"
    smallScreenExpandButtonText={expandButtonContent}
    initiallyExpanded={false}
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
    <ServiceNavigationItem>
      <RouterLink
        asComponent={ExternalLink}
        href="https://www.suomi.fi"
        hideIcon
      >
        New Message
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
    <ServiceNavigationItem disabled>
      <RouterLink>Devices</RouterLink>
    </ServiceNavigationItem>
  </ServiceNavigation>
</div>;
```
