import React from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { SuomifiIcon, SuomifiIconInterface } from 'suomifi-icons';
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
  /** Custom fill color */
  color?: string;
  /** Custom fill color, takes precedence over color if both are provided */
  fill?: string;
  testId?: string;
}

export interface IconProps extends IconBaseProps, SuomifiIconInterface {}

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

const Icon = (props: IconProps) => <StyledSuomifiIcon {...props} />;

Icon.displayName = 'Icon';
export { Icon };
