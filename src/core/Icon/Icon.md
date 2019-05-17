```jsx
import { Icon } from 'suomifi-ui-components';

<Icon ariaLabel="Login here" className="my-icon--test" />;
```

```jsx noeditor
import { Icon } from 'suomifi-ui-components';
import styled from '@emotion/styled';
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
