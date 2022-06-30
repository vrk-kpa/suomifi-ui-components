import React from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { ariaLabelOrHidden, ariaFocusableNoLabel } from '../../utils/aria';
import {
  SuomifiStaticIcon,
  SuomifiStaticIconInterface,
  SuomifiComponentIconInterface,
  SuomifiComponentIcon,
} from 'suomifi-icons';
import {
  IconBaseProps,
  cursorPointerClassName,
  baseClassName,
} from '../Icon/Icon';
import { staticIconBaseStyles } from './StaticIcon.baseStyles';

export { IllustrativeIconKeys, DoctypeIconKeys } from 'suomifi-icons';

const staticIconBaseClassName = `fi-static-icon`;

export interface StaticIconProps
  extends IconBaseProps,
    SuomifiStaticIconInterface {
  /**
   * Highlight fill and stroke color for the icon
   * @default accentBase
   */
  highlightColor?: string;
  /**
   * Base fill and stroke color for the icon
   * @default depthBase
   */
  baseColor?: string;
}

const StyledSuomifiStaticIcon = styled(
  ({
    ariaLabel,
    mousePointer,
    highlightColor,
    baseColor,
    ...passProps
  }: StaticIconProps) => (
    <SuomifiStaticIcon
      {...passProps}
      {...ariaLabelOrHidden(ariaLabel)}
      {...ariaFocusableNoLabel(ariaLabel)}
    />
  ),
)`
  ${staticIconBaseStyles}
`;

/**
 * Static icon-component
 */
const StaticIcon = (props: StaticIconProps) => {
  const { className, mousePointer, ...passProps } = props;

  return (
    <StyledSuomifiStaticIcon
      {...passProps}
      className={classnames(baseClassName, staticIconBaseClassName, className, {
        [cursorPointerClassName]: !!mousePointer,
      })}
    />
  );
};

StaticIcon.displayName = 'StaticIcon';

export interface ComponentIconProps
  extends IconBaseProps,
    SuomifiComponentIconInterface {}

const StyledSuomifiComponentIcon = styled(
  ({ ariaLabel, mousePointer, ...passProps }: ComponentIconProps) => (
    <SuomifiComponentIcon
      {...passProps}
      {...ariaLabelOrHidden(ariaLabel)}
      {...ariaFocusableNoLabel(ariaLabel)}
    />
  ),
)`
  ${staticIconBaseStyles}
`;

const ComponentIcon = (props: ComponentIconProps) => {
  const { className, ariaLabel, ...passProps } = props;

  return (
    <StyledSuomifiComponentIcon
      {...passProps}
      ariaLabel={ariaLabel}
      className={className}
    />
  );
};

ComponentIcon.displayName = 'ComponentIcon';
export { ComponentIcon, StaticIcon };
