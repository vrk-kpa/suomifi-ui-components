import React from 'react';
import { default as styled } from 'styled-components';
import * as baseIcons from 'suomifi-icons/baseIcons';
import * as illustrativeIcons from 'suomifi-icons/illustrativeIcons';
import * as doctypeIcons from 'suomifi-icons/doctypeIcons';
import * as logoIcons from 'suomifi-icons/logoIcons';
import clipboardCopy from 'clipboard-copy';
import { suomifiDesignTokens } from 'suomifi-design-tokens';

// const resolveIconSet = (iconSetName: string) => {
//   switch (iconSetName) {
//     case 'baseIcons':
//       return baseIcons;
//     case 'illustrativeIcons':
//       return illustrativeIcons;
//     case 'doctypeIcons':
//       return doctypeIcons;
//     case 'logoIcons':
//       return logoIcons;
//     default:
//       return baseIcons;
//   }
// };

const IconWrapper = styled.figure`
  display: inline-block;
  width: 160px;
  margin: 0;
  text-align: center;
  figcaption {
    margin-top: 0;
    margin-bottom: ${suomifiDesignTokens.spacing.m};
  }
`;

const iconProps = (icon: string) => ({
  height: '45px',
  width: 'auto',
  onClick: () => console.log(clipboardCopy(icon)),
  mousepointer: true,
});

const iconStyles = {
  margin: `${suomifiDesignTokens.spacing.xs} 0 0 0`,
  color: `${suomifiDesignTokens.colors.depthDark1}`,
};

const BaseIcons = () => (
  <div>
    {Object.keys(baseIcons).map((icon) => {
      const Icon = baseIcons[icon as keyof typeof baseIcons];
      const StyledIcon = styled(() => <Icon {...iconProps(icon)} />)({
        ...iconStyles,
      });
      return (
        <IconWrapper key={icon}>
          <StyledIcon />
          <figcaption>{icon}</figcaption>
        </IconWrapper>
      );
    })}
  </div>
);

const IllustrativeIcons = () => (
  <div>
    {Object.keys(illustrativeIcons).map((icon) => {
      const Icon = illustrativeIcons[icon as keyof typeof illustrativeIcons];
      const StyledIcon = styled(() => <Icon {...iconProps(icon)} />)({
        ...iconStyles,
      });
      return (
        <IconWrapper key={icon}>
          <StyledIcon />
          <figcaption>{icon}</figcaption>
        </IconWrapper>
      );
    })}
  </div>
);
const DoctypeIcons = () => (
  <div>
    {Object.keys(doctypeIcons).map((icon) => {
      const Icon = doctypeIcons[icon as keyof typeof doctypeIcons];
      const StyledIcon = styled(() => <Icon {...iconProps(icon)} />)({
        ...iconStyles,
      });
      return (
        <IconWrapper key={icon}>
          <StyledIcon />
          <figcaption>{icon}</figcaption>
        </IconWrapper>
      );
    })}
  </div>
);
const LogoIcons = () => (
  <div>
    {Object.keys(logoIcons).map((icon) => {
      const Icon = logoIcons[icon as keyof typeof logoIcons];
      const StyledIcon = styled(() => <Icon {...iconProps(icon)} />)({
        ...iconStyles,
      });
      return (
        <IconWrapper key={icon}>
          <StyledIcon />
          <figcaption>{icon}</figcaption>
        </IconWrapper>
      );
    })}
  </div>
);

export { BaseIcons, IllustrativeIcons, DoctypeIcons, LogoIcons };
