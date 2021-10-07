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
    margin: `${suomifiDesignTokens.spacing.insetXs}`
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
import { suomifiDesignTokens } from 'suomifi-design-tokens';

const StyledStaticIcon = styled((props) => <StaticIcon {...props} />)(
  {
    height: '50px',
    width: 'auto',
    margin: `${suomifiDesignTokens.spacing.xs} 0 0 0`
  }
);
const IconWrapper = styled.figure`
  display: inline-block;
  width: 200px;
  margin: 0;
  text-align: center;
  figcaption {
    margin-top: 0;
    margin-bottom: ${suomifiDesignTokens.spacing.xs};
  }
`;

<div>
  <div>
    {illustrativeIcons.map((icon) => (
      <IconWrapper>
        <StyledStaticIcon
          mousePointer
          icon={icon}
          key={icon}
          onClick={() => clipboardCopy(icon)}
        />
        <figcaption>{icon}</figcaption>
      </IconWrapper>
    ))}
  </div>
  <div>
    {doctypeIcons.map((icon) => (
      <IconWrapper>
        <StyledStaticIcon
          mousePointer
          icon={icon}
          key={icon}
          onClick={() => clipboardCopy(icon)}
        />
        <figcaption>{icon}</figcaption>
      </IconWrapper>
    ))}
  </div>
</div>;
```
