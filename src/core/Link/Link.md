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

Show link for keyboard navigation.

- Should be the first element that can gain focus on the page with the tab.
- The target container should have `tabIndex={-1}` to handle better the functionality with screenreaders.
- Because of the tabIndex you might want set the style of `outline=none` to the target container.
- To see the component, click below on the dashed area and then press `Tab`.

```js
import { Link } from 'suomifi-ui-components';
<div>
  <div
    style={{
      height: '80px',
      width: '210px',
      borderStyle: 'dashed',
      borderColor: '#000',
      borderWidth: '1px'
    }}
  >
    <Link.skip href="#">Skip to main content</Link.skip>
  </div>
</div>;
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
