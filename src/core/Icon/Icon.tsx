import React, { Component } from 'react';
import styled from '@emotion/styled';
import { iconBaseStyles } from './Icon.baseStyles';
import { suomifiTheme } from '../theme';
import {
  ariaLabelOrHidden,
  ariaFocusableNoLabel,
} from '../../components/utils/aria';
import classnames from 'classnames';
import {
  Icon as CompIcon,
  IconProps as CompIconProps,
} from '../../components/Icon/Icon';
import { Omit } from '../../utils/typescript';
import { SuomifiIcon, SuomifiIconInterface, IconKeys } from 'suomifi-icons';
export { IconKeys } from 'suomifi-icons';

export interface IconProps extends Omit<CompIconProps, 'src'> {
  /** Icon-name from suomifi-icons */
  icon?: IconKeys;
  /** Image file */
  src?: string;
}

const baseClassName = 'fi-icon';

const StyledSuomifiIcon = styled(
  ({
    ariaLabel,
    propsClassName,
    className,
    ...passProps
  }: SuomifiIconInterface & {
    ariaLabel?: string;
    propsClassName?: string;
    className?: string;
  }) => (
    <SuomifiIcon
      {...passProps}
      {...ariaLabelOrHidden(ariaLabel)}
      {...ariaFocusableNoLabel(ariaLabel)}
      className={classnames(className, propsClassName, baseClassName)}
    />
  ),
)`
  ${iconBaseStyles}
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
    const {
      src,
      icon,
      ariaLabel,
      className: propsClassName,
      ...rest
    } = this.props;

    if (icon !== undefined) {
      return (
        <StyledSuomifiIcon
          {...rest}
          icon={icon}
          ariaLabel={ariaLabel}
          propsClassName={propsClassName}
        />
      );
    }

    return !!src ? (
      <CompIcon
        src={src}
        {...rest}
        ariaLabel={ariaLabel}
        className={classnames(propsClassName, baseClassName)}
      />
    ) : null;
  }
}
