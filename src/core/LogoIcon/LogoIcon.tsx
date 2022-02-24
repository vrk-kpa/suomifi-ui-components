import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { ariaLabelOrHidden, ariaFocusableNoLabel } from '../../utils/aria';
import { SuomifiLogoIcon, SuomifiLogoIconInterface } from 'suomifi-icons';
import {
  iconLogger,
  cursorPointerClassName,
  baseClassName,
} from '../Icon/Icon';
import { logoIconBaseStyles } from './LogoIcon.baseStyles';

export { LogoIconKeys } from 'suomifi-icons';

const logoIconBaseClassName = `fi-logo-icon`;

export interface LogoIconProps extends SuomifiLogoIconInterface {
  /** Aria-label for SVG, undefined hides SVG from screen reader
   * @default undefined
   */
  ariaLabel?: string;
  /** Show mouse cursor as hand-pointer */
  mousePointer?: boolean;
}

const StyledSuomifiLogoIcon = styled(
  ({ ariaLabel, mousePointer, ...passProps }: LogoIconProps) => (
    <SuomifiLogoIcon
      {...passProps}
      {...ariaLabelOrHidden(ariaLabel)}
      {...ariaFocusableNoLabel(ariaLabel)}
    />
  ),
)`
  ${logoIconBaseStyles}
`;

/**
 * Logo icon-component
 */
export class LogoIcon extends Component<LogoIconProps> {
  render() {
    const { icon, className, mousePointer, ...passProps } = this.props;
    const { ariaLabel } = this.props;

    if (icon !== undefined) {
      return (
        <StyledSuomifiLogoIcon
          {...passProps}
          icon={icon}
          className={classnames(
            baseClassName,
            logoIconBaseClassName,
            className,
            {
              [cursorPointerClassName]: !!mousePointer,
            },
          )}
        />
      );
    }

    iconLogger(ariaLabel, className);

    return;
  }
}
