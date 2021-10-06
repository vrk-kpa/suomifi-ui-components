```jsx
import {
  StaticIcon,
  suomifiDesignTokens
} from 'suomifi-ui-components';
import { default as styled } from 'styled-components';

const StyledStaticIcon = styled((props) => <StaticIcon {...props} />)(
  {
    height: '50px',
    width: 'auto',
    margin: '8px'
  }
);

<StyledStaticIcon
  icon="settings"
  ariaLabel="Settings"
  className="my-static-icon--test"
  highlightColor={suomifiDesignTokens.colors.accentTertiaryDark1}
  baseColor={suomifiDesignTokens.colors.accentSecondary}
/>;
```

```jsx noeditor
import { StaticIcon } from 'suomifi-ui-components';
import { default as styled } from 'styled-components';
import { illustrativeIcons, doctypeIcons } from 'suomifi-icons';
import clipboardCopy from 'clipboard-copy';

const StyledStaticIcon = styled((props) => <StaticIcon {...props} />)(
  {
    height: '50px',
    width: 'auto',
    margin: '8px 0 0 0'
  }
);
const IconWpr = styled.figure`
  display: inline-block;
  width: 200px;
  margin: 0;
  text-align: center;
  figcaption {
    margin-top: 0;
    margin-bottom: 10px;
  }
`;

<div>
  <div>
    {illustrativeIcons.map((icon) => (
      <IconWpr>
        <StyledStaticIcon
          mousePointer
          icon={icon}
          key={icon}
          onClick={() => clipboardCopy(icon)}
        />
        <figcaption>{icon}</figcaption>
      </IconWpr>
    ))}
  </div>
  <div>
    {doctypeIcons.map((icon) => (
      <IconWpr>
        <StyledStaticIcon
          mousePointer
          icon={icon}
          key={icon}
          onClick={() => clipboardCopy(icon)}
        />
        <figcaption>{icon}</figcaption>
      </IconWpr>
    ))}
  </div>
</div>;
```
