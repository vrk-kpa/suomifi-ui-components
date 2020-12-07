import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { iconBaseStyles } from './Icon.baseStyles';
import { withSuomifiDefaultProps } from '../theme/utils';
import { TokensProp } from '../theme';
import { ariaLabelOrHidden, ariaFocusableNoLabel } from '../../utils/aria';
import { SuomifiIcon, SuomifiIconInterface } from 'suomifi-icons';
import { logger } from '../../utils/logger';
export { BaseIconKeys } from 'suomifi-icons';

const baseClassName = 'fi-icon';

export interface IconBaseProps extends TokensProp {
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
  ({ ariaLabel, mousePointer, className, ...passProps }: IconProps) => {
    return (
      <SuomifiIcon
        className={classnames(baseClassName, className)}
        {...passProps}
        {...ariaLabelOrHidden(ariaLabel)}
        {...ariaFocusableNoLabel(ariaLabel)}
      />
    );
  },
)`
  ${(props) => iconBaseStyles(props)}
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

    const iconColor = color !== undefined ? color : 'currentColor';

    if (icon !== undefined) {
      return <StyledSuomifiIcon {...passProps} icon={icon} color={iconColor} />;
    }

    iconLogger(ariaLabel, className);

    return;
  }
}
