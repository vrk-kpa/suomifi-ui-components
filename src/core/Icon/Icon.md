- Uses currentColor by default if no `fill` or `color` prop is given.

```jsx
import { Icon } from 'suomifi-ui-components';

<>
  <Icon
    icon="login"
    ariaLabel="Login here"
    className="my-icon--test"
  />
  <div style={{ color: 'orange' }}>
    <Icon
      icon="login"
      ariaLabel="Login here"
      className="my-icon--test"
    />
  </div>
</>;
```

### Icon with no label

```jsx
import { Icon } from 'suomifi-ui-components';

<Icon icon="heart" fill="red" />;
```

```jsx noeditor
import { Icon } from 'suomifi-ui-components';
import { default as styled } from 'styled-components';
import { baseIcons } from 'suomifi-icons';
import clipboardCopy from 'clipboard-copy';
import { suomifiDesignTokens } from 'suomifi-design-tokens';

const StyledIcon = styled((props) => <Icon {...props} />)({
  height: '50px',
  width: 'auto',
  margin: '8px',
  fill: `${suomifiDesignTokens.colors.depthDark1}`
});

<div>
  {baseIcons.map((icon) => (
    <StyledIcon
      mousePointer
      icon={icon}
      key={icon}
      onClick={() => clipboardCopy(icon)}
    />
  ))}
</div>;
```
