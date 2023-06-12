### Link List

A styled list for providing a list of links.

Make sure you use a descriptive heading or a label with the list and link it to the list via the `ariaDescribedBy` prop. Make sure you use the right heading level semantically and use the `as` prop for changing the styling if needed.

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
  <Heading variant="h5" as="h3" id="otsikko">
    Useful resources
  </Heading>
  <LinkList aria-describedby="otsikko">
    <LinkListItem>
      <Link href="/">A useful link</Link>
    </LinkListItem>
    <LinkListItem>
      <ExternalLink
        href="https://designsystem.suomi.fi/fi/"
        labelNewWindow="Opens to a new window"
      >
        A useful resource on a third party site
      </ExternalLink>
    </LinkListItem>
    <LinkListItem>
      <RouterLink
        href="https://suomi.fi"
        target="_blank"
        asComponent="a"
      >
        Testing
      </RouterLink>
    </LinkListItem>
  </LinkList>
</div>;
```
