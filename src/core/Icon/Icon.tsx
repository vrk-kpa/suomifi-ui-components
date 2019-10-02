import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import { iconBaseStyles } from './Icon.baseStyles';
import { withSuomifiDefaultProps } from '../theme/utils';
import { TokensProp } from '../theme';
import {
  ariaLabelOrHidden,
  ariaFocusableNoLabel,
} from '../../components/utils/aria';
import {
  Icon as CompIcon,
  IconProps as CompIconProps,
} from '../../components/Icon/Icon';
import { Omit } from '../../utils/typescript';
import {
  SuomifiIcon,
  SuomifiIconInterface,
  IconKeys,
  StaticIconKeys,
} from 'suomifi-icons';
import { logger } from '../../utils/logger';
export { IconKeys, StaticIconKeys } from 'suomifi-icons';

export interface IconProps extends Omit<CompIconProps, 'src'>, TokensProp {
  /** Icon-name from suomifi-icons */
  icon?: IconKeys | StaticIconKeys;
  /** Image file */
  src?: string;
}

interface StyledIconProps extends CompIconProps {
  ariaLabel?: string;
}

interface StyledSuomifiIconProps extends SuomifiIconInterface {
  ariaLabel?: string;
  mousePointer?: boolean;
}

type optionalSuomifiIconInterface = {
  [K in keyof SuomifiIconInterface]?: SuomifiIconInterface[K]
};

export interface SuomifiIconProps extends optionalSuomifiIconInterface {
  ariaLabel?: string;
  mousePointer?: boolean;
}

const StyledIcon = styled(({ ariaLabel, ...passProps }: StyledIconProps) => (
  <CompIcon
    {...passProps}
    {...ariaLabelOrHidden(ariaLabel)}
    {...ariaFocusableNoLabel(ariaLabel)}
  />
))`
  ${props => iconBaseStyles(props)}
`;

const StyledSuomifiIcon = styled(
  ({ ariaLabel, mousePointer, ...passProps }: StyledSuomifiIconProps) => {
    return (
      <SuomifiIcon
        {...passProps}
        {...ariaLabelOrHidden(ariaLabel)}
        {...ariaFocusableNoLabel(ariaLabel)}
      />
    );
  },
)`
  ${props => iconBaseStyles(props)}
`;

/**
 * General icon-component
 */
export class Icon extends Component<IconProps> {
  render() {
    const {
      src,
      color,
      icon = 'login',
      tokens,
      ...passProps
    } = withSuomifiDefaultProps(this.props);
    const { className, ariaLabel } = this.props;
    const iconColor = color !== undefined ? color : tokens.colors.depthDark27;

    if (!!src) {
      return <StyledIcon src={src} {...passProps} color={iconColor} />;
    }

    if (icon !== undefined) {
      return <StyledSuomifiIcon {...passProps} icon={icon} color={iconColor} />;
    }

    logger.warn(
      `Icon ERROR${
        !!ariaLabel
          ? ` with aria-label: ${ariaLabel}`
          : !!className
          ? ` with className: ${className}`
          : ''
      }`,
    );
  }
}
