```jsx
import { LogoIcon } from 'suomifi-ui-components';
import { default as styled } from 'styled-components';
import { suomifiDesignTokens } from 'suomifi-design-tokens';
const StyledLogoIcon = styled((props) => <LogoIcon {...props} />)({
  height: '100px',
  width: 'auto',
  margin: `${suomifiDesignTokens.spacing.xs} 0 0 0`
});

<StyledLogoIcon icon="horizontal" className="my-logo-icon" />;
```

```jsx noeditor
import { LogoIcon } from 'suomifi-ui-components';
import { default as styled } from 'styled-components';
import { logoIcons } from 'suomifi-icons';
import clipboardCopy from 'clipboard-copy';
import { suomifiDesignTokens } from 'suomifi-design-tokens';

const StyledLogoIcon = styled((props) => <LogoIcon {...props} />)({
  height: '80px',
  width: 'auto'
});

const iconWrapperStyles = `
  display: inline-block;
  width: 160px;
  margin: 0 0 ${suomifiDesignTokens.spacing.xs} 0; 
  padding: ${suomifiDesignTokens.spacing.xs} 0;
  text-align: center;
`;
const IconWrapper = styled.figure`
  ${iconWrapperStyles}
`;
const InvertedIconWrapper = styled.figure`
  ${iconWrapperStyles}
  background: ${suomifiDesignTokens.colors.brandBase};
  figcaption {
    color: ${suomifiDesignTokens.colors.whiteBase};
  }
`;

<div>
  <div>
    {logoIcons.map((icon) =>
      icon.includes('Invert') ? (
        <InvertedIconWrapper key={icon}>
          <StyledLogoIcon
            mousePointer
            icon={icon}
            onClick={() => clipboardCopy(icon)}
          />
          <figcaption>{icon}</figcaption>
        </InvertedIconWrapper>
      ) : (
        <IconWrapper key={icon}>
          <StyledLogoIcon
            mousePointer
            icon={icon}
            onClick={() => clipboardCopy(icon)}
          />
          <figcaption>{icon}</figcaption>
        </IconWrapper>
      )
    )}
  </div>
</div>;
```
