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
  <ServiceNavigation>
    <ServiceNavigationItem aria-label="16 unread messages">
      <RouterLink href="/">
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
    <ServiceNavigationItem selected ariaCurrent="page">
      <RouterLink
        asComponent={ExternalLink}
        href="https://www.suomi.fi"
        hideIcon
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
