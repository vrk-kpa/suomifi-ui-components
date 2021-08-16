import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { SuomifiIcon, SuomifiIconInterface } from 'suomifi-icons';
import { logger } from '../../utils/logger';
import { ariaLabelOrHidden, ariaFocusableNoLabel } from '../../utils/aria';
import { iconBaseStyles } from './Icon.baseStyles';

export { BaseIconKeys } from 'suomifi-icons';

export const baseClassName = 'fi-icon';
export const cursorPointerClassName = `${baseClassName}--cursor-pointer`;

export interface IconBaseProps {
  /** Aria-label for SVG, undefined hides SVG from screen reader
   * @default undefined
   */
  ariaLabel?: string;
  /** Show mouse cursor as hand-pointer */
  mousePointer?: boolean;
  testId?: string;
}

export interface IconProps extends IconBaseProps, SuomifiIconInterface {}

export const iconLogger = (
  ariaLabel: string | undefined,
  className: string | undefined,
) => {
  logger.warn(
    `Icon ERROR${
      !!ariaLabel
        ? ` with aria-label: ${ariaLabel}`
        : !!className
        ? ` with className: ${className}`
        : ''
    }`,
  );
};

/**
 * Apply Suomifi styles to Icon
 */
const StyledSuomifiIcon = styled(
  ({ ariaLabel, mousePointer, className, ...passProps }: IconProps) => (
    <SuomifiIcon
      className={classnames(baseClassName, className, {
        [cursorPointerClassName]: !!mousePointer,
      })}
      {...passProps}
      {...ariaLabelOrHidden(ariaLabel)}
      {...ariaFocusableNoLabel(ariaLabel)}
    />
  ),
)`
  ${iconBaseStyles}
`;

/**
 * General icon-component
 */
export class Icon extends Component<IconProps> {
  render() {
    const { color, icon, fill, ...passProps } = this.props;
    const { className, ariaLabel } = this.props;

    const iconColor = fill ?? color ?? 'currentColor';

    if (icon !== undefined) {
      return <StyledSuomifiIcon {...passProps} icon={icon} color={iconColor} />;
    }

    iconLogger(ariaLabel, className);

    return;
  }
}
