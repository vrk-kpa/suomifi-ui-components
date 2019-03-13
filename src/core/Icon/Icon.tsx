import React, { Component } from 'react';
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
import { SuomifiIcon, IconKeys } from 'suomifi-icons';
export { IconKeys } from 'suomifi-icons';

export interface IconProps extends Omit<CompIconProps, 'src'> {
  /** Icon-name from suomifi-icons */
  icon?: IconKeys;
  /** Image file */
  src?: string;
}

const className = 'fi-icon';

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
        <SuomifiIcon
          {...rest}
          icon={icon}
          {...ariaLabelOrHidden(ariaLabel)}
          {...ariaFocusableNoLabel(ariaLabel)}
          className={classnames(propsClassName, className)}
        />
      );
    }

    return !!src ? (
      <CompIcon
        src={src}
        {...rest}
        ariaLabel={ariaLabel}
        className={classnames(propsClassName, className)}
      />
    ) : null;
  }
}
