```js
import { Link, LinkExternal, Paragraph } from 'suomifi-ui-components';

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

### External link

```js
import { Link } from 'suomifi-ui-components';

<Link.external href="https://www.sweden.se/">
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
