The `<Link>` component applies Suomi.fi styles to HTML `<a>` elements.

Link should be used when you want navigate to a different URL, provide a way to bookmark a page or open it to a new tab.

If you want to trigger an action that does not change the URL use the <a href="#/Components/Button">Button</a> component instead.

Examples:

<ul>
  <li><a href="/#/Components/Link?id=basic-use">Basic use</a></li>
  <li><a href="/#/Components/Link?id=underline">Underline</a></li>
  <li><a href="/#/Components/Link?id=small-screen">Small screen</a></li>
  <li><a href="/#/Components/Link?id=accented">Accented</a></li>
  <li><a href="/#/Components/Link?id=skip-link">Skip link</a></li>
  <li><a href="/#/Components/Link?id=external-link">External link</a></li>
  <li><a href="/#/Components/Link?id=router-link">Router link</a></li>
</ul>

<div style="margin-bottom: 5px">
  <a href="/#/Components/Link?id=props--methods">Props & methods (Link)</a>
</div>
<div style="margin-bottom: 5px">
  <a href="/#/Components/Link?id=skiplink">Props & methods (SkipLink)</a>
</div>
<div style="margin-bottom: 5px">
  <a href="/#/Components/Link?id=externallink">Props & methods (ExternalLink)</a>
</div>
<div style="margin-bottom: 40px">
  <a href="/#/Components/Link?id=routerlink">Props & methods (RouterLink)</a>
</div>

### Basic use

```jsx
import { Link } from 'suomifi-ui-components';

<Link href="#">Contact information</Link>;
```

### Underline

Use the `underline` prop the control when the link gets underlined. Default value is `'hover'`.

```jsx
import { Link } from 'suomifi-ui-components';

<Link href="#" underline="initial">
  Contact information
</Link>;
```

### Small screen

Use small screen styles on narrower screen sizes.

```jsx
import { Link } from 'suomifi-ui-components';

<Link href="#" smallScreen>
  Contact information
</Link>;
```

### Accented

`variant="accent"` can be used to provide the Link more visual emphasis.

```jsx
import { Link } from 'suomifi-ui-components';

<Link href="#" variant="accent">
  Contact information
</Link>;
```

### Skip link

The `<SkipLink>` component is used to quickly jump to different parts of the page. It is inteded for keyboard users.

- Should be the first element that can gain focus on the page with Tab.
- The target container should have `tabIndex={-1}` to better handle the functionality with screenreaders.
- Because of the tabIndex you might want set the style of `outline=none` to the target container.
- To see the component, click on the dashed area below and then press Tab.

```js
import { SkipLink } from 'suomifi-ui-components';
<div
  style={{
    height: '80px',
    width: '210px',
    border: '1px dashed #000'
  }}
>
  <SkipLink href="#main">Skip to main content</SkipLink>
</div>;
```

### External link

The `<ExternalLink>` component should be used when the destination URL is outside of the current web page domain.

Be default, ExternalLink opens the URL to a new tab/window (depending on the browser's implementation of `target="_blank"`). Therefore it is important to set the `labelNewWindow` prop for assistive technology explaining this behavior.

You can open the link in the same window by setting `toNewWindow={false}`.

```js
import { ExternalLink } from 'suomifi-ui-components';

<ExternalLink
  href="https://github.com/vrk-kpa/suomifi-ui-components"
  labelNewWindow="Opens to a new tab"
>
  Source code on GitHub
</ExternalLink>;
```

### Router link

The `<RouterLink>` component is mainly intended to be used with external libraries/frameworks which provide a link component of their own.

- Uses polymorphism to render as the component of your choice (for example React Router Link) but with proper Suomi.fi link styles.
- Full Typescript support for props based on the component passed to `asComponent`
- Full theme customisation support through `SuomifiThemeProvider`

```js
import { RouterLink } from 'suomifi-ui-components';

const Component = (props) => {
  const { children, ...passProps } = props;
  return <a {...passProps}>{children}</a>;
};

<RouterLink
  href="https://suomi.fi"
  target="_blank"
  asComponent={Component}
>
  Contact information
</RouterLink>;
```

## Props & methods
