- Uses _currentColor_ by default if no `fill` or `color` prop is given
- Icons can be styled via props or internal classes.

```jsx
import { Icon } from 'suomifi-ui-components';

<>
  <Icon
    icon="login"
    ariaLabel="Login here"
    className="my-icon-class"
  />

  <div style={{ color: 'orange' }}>
    <Icon icon="search" ariaLabel="Search" />
  </div>

  <Icon icon="checkSelected" ariaLabel="Selected" color="green" />
</>;
```

### Styling using classNames

```jsx
import { Icon } from 'suomifi-ui-components';

/**
 .fi-icon.custom-icon .fi-icon-base-fill {
   fill: red;
 }
*/

<>
  <Icon icon="login" ariaLabel="Login here" className="custom-icon" />

  <div style={{ color: 'orange' }}>
    <Icon icon="login" ariaLabel="Login here" />
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
  margin: '8px'
});

<div>
  {baseIcons.map((icon) => (
    <StyledIcon
      mousePointer
      icon={icon}
      key={icon}
      onClick={() => clipboardCopy(icon)}
      color={suomifiDesignTokens.colors.depthDark1}
    />
  ))}
</div>;
```
