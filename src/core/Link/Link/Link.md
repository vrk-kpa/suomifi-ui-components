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
import { SkipLink } from 'suomifi-ui-components';
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
    <SkipLink href="#">Skip to main content</SkipLink>
  </div>
</div>;
```

### External link

```js
import { ExternalLink } from 'suomifi-ui-components';

<>
  <ExternalLink
    href="https://designsystem.suomi.fi/fi/"
    labelNewWindow="Opens to a new window"
  >
    External link opens to new window
  </ExternalLink>
  <ExternalLink
    href="https://designsystem.suomi.fi/fi/"
    toNewWindow={false}
  >
    External link in same window
  </ExternalLink>
</>;
```

### Router link

This component is mainly intended to be used with external libraries/frameworks.

- Renders as the component of your choice, for example <a href="https://reactrouter.com/docs/en/v6/components/link" target="_blank">React Router Link</a>, but with proper Suomi.fi link styles
- Full Typescript support for props based on the component passed to `asComponent`
- Full theme customisation support through `SuomifiThemeProvider`

```js
import { RouterLink } from 'suomifi-ui-components';
import { forwardRef, useRef } from 'react';

const Component = forwardRef((props, ref) => {
  const { children, ...passProps } = props;
  return (
    <a {...passProps} ref={ref}>
      Some component - {children}
    </a>
  );
});

const r = useRef();

<>
  <button onClick={() => console.log(r.current)}>
    Log ref to console
  </button>
  <RouterLink
    href="https://suomi.fi"
    target="_blank"
    asComponent={Component}
    ref={r}
  >
    Testing
  </RouterLink>
</>;
```
