import React, { Component } from 'react';
import { defaultPropsTheme } from '../utils';
import { ariaLabelOrHidden } from '../../components/utils/aria';
import classnames from 'classnames';
import { Svg, SvgProps } from '../../components/Svg/Svg';
import { Omit } from '../utils/typescript';
import { SuomifiIcon, IconKeys } from 'suomifi-icons';
export { IconKeys } from 'suomifi-icons';

export interface IconProps extends Omit<SvgProps, 'src'> {
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
  static defaultProps = defaultPropsTheme({}, theme => ({
    icon: 'login',
    color: theme.colors.brandColor,
  }));

  render() {
    const {
      src,
      icon,
      ariaLabel,
      className: propsClassName,
      ...passProps
    } = this.props;

    if (icon !== undefined) {
      return (
        <SuomifiIcon
          {...passProps}
          icon={icon}
          {...ariaLabelOrHidden(ariaLabel)}
          className={classnames(propsClassName, className)}
        />
      );
    }

    return !!src ? (
      <Svg
        src={src}
        {...passProps}
        ariaLabel={ariaLabel}
        className={classnames(propsClassName, className)}
      />
    ) : null;
  }
}
