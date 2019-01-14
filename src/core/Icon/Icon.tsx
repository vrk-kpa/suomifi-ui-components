import React, { Component } from 'react';
import { defaultPropsTheme, objValue } from '../utils';
import classnames from 'classnames';
import {
  default as CompIcon,
  IIconProps as ICompIconProps,
} from '../../components/Icon/Icon';
import { icons, IconKeys } from '../theme/icons';
import iconLoginSvg from '../theme/icons/icon-login.svg';
import { Omit } from '../utils/typescript';

export interface IIconProps extends Omit<ICompIconProps, 'src'> {
  icon?: IconKeys;
  src?: string;
}

const className = 'fi-icon';

/**
 * General icon-component
 */
export default class Icon extends Component<IIconProps> {
  static defaultProps = defaultPropsTheme(CompIcon, theme => ({
    src: iconLoginSvg, // TODO
    color: theme.colors.brandColor,
  }));

  render() {
    const { src, icon, className: propsClassName, ...passProps } = this.props;
    const iconsIcon = (icon: IconKeys) => {
      const iconSrc = objValue(icons, icon);
      return !!iconSrc ? iconSrc : src;
    };
    const iconSrc = !!icon ? iconsIcon(icon) : src;
    const defaultIcon = iconLoginSvg;
    return (
      <CompIcon
        {...passProps}
        src={!!iconSrc ? iconSrc : defaultIcon}
        className={classnames(propsClassName, className)}
      />
    );
  }
}
