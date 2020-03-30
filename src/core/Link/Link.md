```js
import { Link, Paragraph } from 'suomifi-ui-components';

<Paragraph>
  <Link
    className="test-classname"
    href="https://www.notvisitedlink.com/"
  >
    Not visited link
  </Link>{' '}
  <Link className="test-classname" href="#">
    Visited link
  </Link>
</Paragraph>;
```

### Skip link

Show link for keyboard navigation. Preview not working as intended, because it should be the first element on the page to gain focus on tab.

```js
import { Link } from 'suomifi-ui-components';

<Link.skip>Skip to main content</Link.skip>;
```

### External link

```js
import { Link } from 'suomifi-ui-components';

<Link.external
  href="https://www.sweden.se/"
  labelNewWindow="Opens to a new window"
>
  External link
</Link.external>;
```

### Change component for the link

```js
import { Link } from 'suomifi-ui-components';

const Component = ({ children, ...passProps }) => (
  <a {...passProps}>foo {children} bar</a>
);

<Link
  className="test-classname"
  href="https://www.com/"
  as={Component}
>
  Testing
</Link>;
```
