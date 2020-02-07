import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import { iconBaseStyles } from './Icon.baseStyles';
import { withSuomifiDefaultProps } from '../theme/utils';
import { TokensProp } from '../theme';
import {
  ariaLabelOrHidden,
  ariaFocusableNoLabel,
} from '../../components/utils/aria';
import { SuomifiIcon, SuomifiIconInterface } from 'suomifi-icons';
import { logger } from '../../utils/logger';
export { IconKeys, StaticIconKeys } from 'suomifi-icons';

export interface IconProps extends TokensProp, SuomifiIconInterface {
  /** Aria-label for SVG, undefined hides SVG from screen reader
   * @default undefined
   */
  ariaLabel?: string;
  /** Custom classname to SVG-element extend or customize */
  svgClassName?: string;
  /** Show mouse cursor as hand-pointer */
  mousePointer?: boolean;
  testId?: string;
}

/**
 * Apply Suomifi styles to Icon
 */
const StyledSuomifiIcon = styled(
  ({ ariaLabel, mousePointer, ...passProps }: IconProps) => {
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
    const { color, icon, tokens, ...passProps } = withSuomifiDefaultProps(
      this.props,
    );
    const { className, ariaLabel } = this.props;

    const iconColor = color !== undefined ? color : tokens.colors.depthDark27;

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
    return;
  }
}
