```jsx
import { StaticIcon } from 'suomifi-ui-components';
import { default as styled } from 'styled-components';

const StyledStaticIcon = styled(props => <StaticIcon {...props} />)({
  height: '50px',
  width: 'auto',
  margin: '8px'
});

<StyledStaticIcon
  icon="settings"
  ariaLabel="Settings"
  className="my-static-icon--test"
/>;
```

```jsx noeditor
import { StaticIcon } from 'suomifi-ui-components';
import { default as styled } from 'styled-components';
import { illustrativeIcons, doctypeIcons } from 'suomifi-icons';
import clipboardCopy from 'clipboard-copy';

const StyledStaticIcon = styled(props => <StaticIcon {...props} />)({
  height: '50px',
  width: 'auto',
  margin: '8px'
});

<div>
  <div>
    {illustrativeIcons.map(icon => (
      <StyledStaticIcon
        mousePointer
        icon={icon}
        key={icon}
        onClick={() => clipboardCopy(icon)}
      />
    ))}
  </div>
  <div>
    {doctypeIcons.map(icon => (
      <StyledStaticIcon
        mousePointer
        icon={icon}
        key={icon}
        onClick={() => clipboardCopy(icon)}
      />
    ))}
  </div>
</div>;
```
