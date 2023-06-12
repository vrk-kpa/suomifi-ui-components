A styled list for providing a list of links.

- Use a descriptive heading or a label with the list.
- Link heading or label to the list via the `ariaDescribedBy` prop.
- Use the right heading level semantically and use the `as` prop for changing the styling if needed.
- Wrap each child in `LinkListItem` component for the correct styling.
- `LinkListItem` supports `Link`, `ExternalLink` and `RouterLink` as its children.

```js
import {
  Link,
  ExternalLink,
  LinkListItem,
  RouterLink,
  LinkList,
  Heading
} from 'suomifi-ui-components';

<div>
  <Heading variant="h5" as="h3" id="heading">
    Useful resources
  </Heading>
  <LinkList aria-describedby="heading">
    <LinkListItem>
      <Link href="/">More information on subject X</Link>
    </LinkListItem>
    <LinkListItem>
      <ExternalLink
        href="https://designsystem.suomi.fi/fi/"
        labelNewWindow="Opens to a new window"
      >
        About subject X on a third party site
      </ExternalLink>
    </LinkListItem>
    <LinkListItem>
      <RouterLink
        href="https://suomi.fi"
        target="_blank"
        asComponent="a"
      >
        An additional useful link
      </RouterLink>
    </LinkListItem>
  </LinkList>
</div>;
```
