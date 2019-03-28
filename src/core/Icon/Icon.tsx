import React, { Component } from 'react';
import styled from '@emotion/styled';
import { iconBaseStyles } from './Icon.baseStyles';
import { suomifiTheme } from '../theme';
import {
  ariaLabelOrHidden,
  ariaFocusableNoLabel,
} from '../../components/utils/aria';
import {
  Icon as CompIcon,
  IconProps as CompIconProps,
} from '../../components/Icon/Icon';
import { Omit } from '../../utils/typescript';
import { SuomifiIcon, SuomifiIconInterface, IconKeys } from 'suomifi-icons';
export { IconKeys } from 'suomifi-icons';
import { logger } from '../../utils/logger';

export interface IconProps extends Omit<CompIconProps, 'src'> {
  /** Icon-name from suomifi-icons */
  icon?: IconKeys;
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
  static defaultProps = {
    icon: 'login',
    color: suomifiTheme.colors.brandColor,
  };

  render() {
    const { src, icon, ...passProps } = this.props;
    const { className, ariaLabel } = this.props;

    if (!!src) {
      return <StyledIcon src={src} {...passProps} />;
    }

    if (icon !== undefined) {
      return <StyledSuomifiIcon {...passProps} icon={icon} />;
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
    return;
  }
}
