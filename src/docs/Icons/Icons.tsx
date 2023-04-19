import React from 'react';
import { default as styled } from 'styled-components';
import * as allIcons from 'suomifi-icons';
import {
  baseIcons,
  illustrativeIcons,
  doctypeIcons,
  logoIcons,
} from 'suomifi-icons';
import clipboardCopy from 'clipboard-copy';
import { suomifiDesignTokens } from 'suomifi-design-tokens';

const baseIconKeys = baseIcons as string[];
const illustrativeIconKeys = illustrativeIcons as string[];
const doctypeIconKeys = doctypeIcons as string[];
const logoIconKeys = logoIcons as string[];

const IconWrapper = styled.figure`
  display: inline-block;
  width: 160px;
  margin: 0px;
  padding: 5px;
  text-align: center;
  figcaption {
    margin-top: 0;
    margin-bottom: ${suomifiDesignTokens.spacing.m};
  }
  :active {
    .fi-icon {
      background-color: ${suomifiDesignTokens.colors.highlightLight3};
    }
  }
`;

const iconProps = (icon: string) => ({
  height: '45px',
  width: '45px',
  onClick: () => console.log(clipboardCopy(icon)),
  mousePointer: true,
});

const iconStyles = {
  margin: `${suomifiDesignTokens.spacing.xs} 0 0 0`,
  color: `${suomifiDesignTokens.colors.depthDark1}`,
};

const BaseIcons = () => (
  <div>
    {baseIconKeys.map((icon) => {
      const iconName = `Icon${icon}`;
      const Icon = allIcons[iconName as keyof typeof allIcons];
      const StyledIcon = styled(() => <Icon {...iconProps(iconName)} />)({
        ...iconStyles,
      });
      return (
        <IconWrapper>
          <StyledIcon />
          <figcaption>{iconName.slice(4)}</figcaption>
        </IconWrapper>
      );
    })}
  </div>
);

const IllustrativeIcons = () => (
  <div>
    {illustrativeIconKeys.map((icon) => {
      const iconName = `Icon${icon}`;
      const Icon = allIcons[iconName as keyof typeof allIcons];
      const StyledIcon = styled(() => <Icon {...iconProps(iconName)} />)({
        ...iconStyles,
      });
      return (
        <IconWrapper key={iconName}>
          <StyledIcon />
          <figcaption>{iconName.slice(4)}</figcaption>
        </IconWrapper>
      );
    })}
  </div>
);

const DoctypeIcons = () => (
  <div>
    {doctypeIconKeys.map((icon) => {
      const iconName = `Icon${icon}`;
      const Icon = allIcons[iconName as keyof typeof allIcons];
      const StyledIcon = styled(() => <Icon {...iconProps(iconName)} />)({
        ...iconStyles,
      });
      return (
        <IconWrapper key={iconName}>
          <StyledIcon />
          <figcaption>{iconName.slice(4)}</figcaption>
        </IconWrapper>
      );
    })}
  </div>
);

const LogoIcons = () => (
  <div>
    {logoIconKeys.map((icon) => {
      const iconName = `Icon${icon}`;
      const Icon = allIcons[iconName as keyof typeof allIcons];
      const isInverted = icon.includes('Invert');
      const invertStyle = isInverted
        ? {
            background: `${suomifiDesignTokens.colors.brandBase}`,
            color: `${suomifiDesignTokens.colors.whiteBase}`,
            padding: '10px',
          }
        : {};
      const StyledIcon = styled(() => <Icon {...iconProps(icon)} />)({
        ...iconStyles,
      });
      return (
        <IconWrapper key={iconName} style={invertStyle}>
          <StyledIcon />
          <figcaption>{iconName.slice(4)}</figcaption>
        </IconWrapper>
      );
    })}
  </div>
);

export { BaseIcons, IllustrativeIcons, DoctypeIcons, LogoIcons };
