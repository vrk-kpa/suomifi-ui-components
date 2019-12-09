```jsx
import { Icon } from 'suomifi-ui-components';

<Icon
  icon="login"
  ariaLabel="Login here"
  className="my-icon--test"
/>;
```

### Icon with no label

```jsx
import { Icon } from 'suomifi-ui-components';

<Icon icon="heart" />;
```

```jsx noeditor
import { Icon } from 'suomifi-ui-components';
import { default as styled } from 'styled-components';
import { allIcons, allStaticIcons } from 'suomifi-icons';
import clipboardCopy from 'clipboard-copy';
const StyledIcon = styled(props => <Icon {...props} />)({
  height: '50px',
  width: 'auto',
  margin: '8px'
});

<div>
  <div>
    {allIcons.map(icon => (
      <StyledIcon
        mousePointer
        icon={icon}
        key={icon}
        onClick={() => clipboardCopy(icon)}
      />
    ))}
  </div>
  <div>
    {allStaticIcons.map(icon => (
      <StyledIcon
        mousePointer
        icon={icon}
        key={icon}
        onClick={() => clipboardCopy(icon)}
      />
    ))}
  </div>
</div>;
```
