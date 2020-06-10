import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { TokensProp, InternalTokensProp } from '../theme';
import { withSuomifiDefaultProps } from '../theme/utils';
import { baseStyles } from './Button.baseStyles';
import {
  Button as CompButton,
  ButtonProps as CompButtonProps,
} from '../../components/Button/Button';
import { Icon, IconProps, BaseIconKeys } from '../Icon/Icon';
import { UnstyledButton } from './UnstyledButton';

type ButtonVariant =
  | 'default'
  | 'inverted'
  | 'secondary'
  | 'secondary-noborder'
  | 'tertiary'
  | 'unstyled';

export interface ButtonProps extends CompButtonProps, TokensProp {
  /**
   * Set width to grow all available space
   */
  fullWidth?: boolean;
  /**
   * 'default' | 'inverted' | 'secondary' | 'secondary-noborder' | 'tertiary'
   * @default default
   */
  variant?: ButtonVariant;
  /**
   * Icon from suomifi-theme
   */
  icon?: BaseIconKeys;
  /**
   * Icon from suomifi-theme to be placed on right side
   */
  iconRight?: BaseIconKeys;
  /**
   * Properties given to Icon-component
   */
  iconProps?: IconProps;
}

const baseClassName = 'fi-button';
const iconClassName = `${baseClassName}_icon`;
const iconRightClassName = `${baseClassName}_icon--right`;
const fullWidthClassName = `${baseClassName}--fullwidth`;

const StyledButton = styled(
  ({
    tokens,
    fullWidth,
    variant = 'default',
    className,
    ...passProps
  }: ButtonProps & { right?: boolean } & InternalTokensProp) => (
    <CompButton
      {...passProps}
      className={classnames(className, {
        [`${baseClassName}--${variant}`]: variant !== 'default',
        [fullWidthClassName]: fullWidth,
      })}
    />
  ),
)`
  ${(props) => baseStyles(props)}
`;

const iconColor = ({
  tokens,
  invert,
  disabled,
}: {
  invert?: boolean;
  disabled?: boolean;
} & InternalTokensProp) => {
  const defaultColor = !!disabled
    ? tokens.colors.depthBase
    : tokens.colors.whiteBase;
  const secondaryColor = !!disabled
    ? tokens.colors.depthBase
    : tokens.colors.highlightBase;
  return !!invert ? secondaryColor : defaultColor;
};

class ButtonWithIcon extends Component<ButtonProps & InternalTokensProp> {
  render() {
    const {
      icon,
      iconRight,
      iconProps = { className: undefined },
      ...passProps
    } = this.props;
    const { tokens, disabled, variant } = passProps;
    const { className: iconPropsClassName, ...passIconProps } = iconProps;

    if (variant === 'unstyled') {
      return <UnstyledButton {...passProps} />;
    }

    const secondaryOrTertiary =
      !!variant &&
      (variant === 'secondary' ||
        variant === 'secondary-noborder' ||
        variant === 'tertiary');
    return (
      <StyledButton {...passProps}>
        {!!icon && (
          <Icon
            mousePointer={true}
            icon={icon}
            color={iconColor({
              tokens,
              disabled,
              invert: secondaryOrTertiary,
            })}
            className={classnames(iconClassName, iconPropsClassName)}
            {...passIconProps}
          />
        )}
        {passProps.children}
        {!!iconRight && (
          <Icon
            mousePointer={true}
            icon={iconRight}
            color={iconColor({
              tokens,
              disabled,
              invert: secondaryOrTertiary,
            })}
            className={classnames(
              iconClassName,
              iconRightClassName,
              iconPropsClassName,
            )}
            {...passIconProps}
          />
        )}
      </StyledButton>
    );
  }
}

/**
 * <i class="semantics" />
 * Use for inside Application onClick events.<br />
 * When using Button.secondaryNoborder with other than white background,<br />
 * define styles background color for all needed states (:hover, :active, :disabled)<br /><br />
 * You can use separate UnstyledButton to get Button without variant styles added by<br />
 * `import { UnstyledButton } from 'suomifi-ui-components';` or `<Button.unstyled />`.
 */
export class Button extends Component<ButtonProps> {
  static inverted = (props: ButtonProps) => {
    return (
      <ButtonWithIcon {...withSuomifiDefaultProps(props)} variant="inverted" />
    );
  };

  static secondary = (props: ButtonProps) => {
    return (
      <ButtonWithIcon {...withSuomifiDefaultProps(props)} variant="secondary" />
    );
  };

  static secondaryNoborder = (props: ButtonProps) => {
    return (
      <ButtonWithIcon
        {...withSuomifiDefaultProps(props)}
        variant="secondary-noborder"
      />
    );
  };

  static tertiary = (props: ButtonProps) => {
    return (
      <ButtonWithIcon {...withSuomifiDefaultProps(props)} variant="tertiary" />
    );
  };

  static unstyled = (props: ButtonProps) => {
    return <UnstyledButton {...withSuomifiDefaultProps(props)} />;
  };

  render() {
    return <ButtonWithIcon {...withSuomifiDefaultProps(this.props)} />;
  }
}
