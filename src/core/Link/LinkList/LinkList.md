`<LinkList>` is a styled list for providing a list of links.

Examples:

- [Basic use](./#/Components/LinkList?id=basic-use)

<div style="margin-bottom: 5px">
  [Props & methods (LinkList)](./#/Components/LinkList?id=props--methods)
</div>
<div style="margin-bottom: 40px">
  [Props & methods (LinkListItem)](./#/Components/LinkList?id=linklistitem)
</div>

### Basic use

- Use a descriptive heading or a label with the list.
- Link the heading/label to the list via the `ariaDescribedBy` prop.
- Use the right heading level semantically and use the `<Heading>` component's `as` prop for changing the styling if needed.
- Wrap each child in `LinkListItem` component to get the correct styling.
- `<LinkListItem>` supports `<Link>`, `<ExternalLink>` and `<RouterLink>` as its children.

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
  <Heading variant="h4" as="h3" id="heading">
    More on the topic
  </Heading>
  <LinkList ariaDescribedBy="heading">
    <LinkListItem>
      <Link href="#">Granting mandates as a person</Link>
    </LinkListItem>
    <LinkListItem>
      <ExternalLink
        href="https://designsystem.suomi.fi/"
        labelNewWindow="Opens to a new window"
      >
        Invalidating mandates as a person
      </ExternalLink>
    </LinkListItem>
    <LinkListItem>
      <RouterLink href="#" target="_blank" asComponent="a">
        Making a mandate request as a person
      </RouterLink>
    </LinkListItem>
  </LinkList>
</div>;
```

### Props & methods
