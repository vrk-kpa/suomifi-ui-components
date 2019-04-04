import React, { Component } from 'react';
import styled from '@emotion/styled';
import classnames from 'classnames';
import { ThemeComponent, ThemeProp } from '../theme';
import { withDefaultTheme } from '../theme/utils/defaultTheme';
import { baseStyles, iconBaseStyles } from './Button.baseStyles';
import {
  Button as CompButton,
  ButtonProps as CompButtonProps,
} from '../../components/Button/Button';
import { Icon, IconProps, IconKeys } from '../Icon/Icon';

type ButtonVariant =
  | 'default'
  | 'negative'
  | 'secondary'
  | 'secondary-noborder'
  | 'tertiary'
  | 'unstyled';

export interface ButtonProps extends CompButtonProps, ThemeComponent {
  /**
   * Set width to grow all available space
   */
  fullWidth?: boolean;
  /**
   * 'default' | 'negative' | 'secondary' | 'secondary-noborder' | 'tertiary'
   * @default default
   */
  variant?: ButtonVariant;
  /**
   * Icon from suomifi-theme
   */
  icon?: IconKeys;
  /**
   * Icon from suomifi-theme to be placed on right side
   */
  iconRight?: IconKeys;
  /**
   * Properties given to Icon-component
   */
  iconProps?: IconProps;
}

const baseClassName = 'fi-button';

const StyledButton = styled(
  ({
    theme,
    fullWidth,
    variant,
    className,
    ...passProps
  }: ButtonProps & { right?: boolean }) => (
    <CompButton
      {...passProps}
      className={classnames(className, baseClassName)}
    />
  ),
)`
  label: ${({ disabled }) =>
    disabled ? `${baseClassName}--disabled` : baseClassName};
  ${props => baseStyles(props)}
`;

const StyledIcon = styled(
  ({ right, ...passProps }: IconProps & { right?: boolean }) => (
    <Icon {...passProps} />
  ),
)`
  ${props => iconBaseStyles(props)}
`;

const iconColor = ({
  theme,
  invert,
  disabled,
}: {
  theme?: ThemeProp;
  invert?: boolean;
  disabled?: boolean;
}) => {
  if (!!theme) {
    const defaultColor = !!disabled
      ? theme.colors.disabledColor
      : theme.colors.white;
    const secondaryColor = !!disabled
      ? theme.colors.disabledColor
      : theme.colors.secondaryColor;
    return !!invert ? secondaryColor : defaultColor;
  }
  return undefined;
};

const UnstyledButton = (props: ButtonProps) => {
  const {
    className,
    theme: dissmissTheme,
    fullWidth: dissmissFullWidth,
    variant: dissmissVariant,
    icon: dismissIcon,
    iconRight: dissmissIconRight,
    ...passProps
  } = props;
  return (
    <CompButton
      {...passProps}
      className={classnames(className, baseClassName)}
    />
  );
};

class ButtonWithIcon extends Component<ButtonProps> {
  render() {
    const {
      children,
      icon,
      iconRight,
      iconProps,
      ...passProps
    } = withDefaultTheme(this.props);
    const { theme, disabled, variant } = passProps;

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
          <StyledIcon
            icon={icon}
            right={false}
            color={iconColor({ theme, disabled, invert: secondaryOrTertiary })}
            {...iconProps}
          />
        )}
        {children}
        {!!iconRight && (
          <StyledIcon
            icon={iconRight}
            right={true}
            color={iconColor({ theme, disabled, invert: secondaryOrTertiary })}
            {...iconProps}
          />
        )}
      </StyledButton>
    );
  }
}

/**
 * Use for inside Application onClick events.<br />
 * When using Button.secondaryNoborder with other than white background,<br />
 * define styles background color for all needed states (:hover, :active, :disabled)
 */
export class Button extends Component<ButtonProps> {
  static negative = (props: ButtonProps) => {
    return <ButtonWithIcon {...props} variant="negative" />;
  };

  static secondary = (props: ButtonProps) => {
    return <ButtonWithIcon {...props} variant="secondary" />;
  };

  static secondaryNoborder = (props: ButtonProps) => {
    return <ButtonWithIcon {...props} variant="secondary-noborder" />;
  };

  static tertiary = (props: ButtonProps) => {
    return <ButtonWithIcon {...props} variant="tertiary" />;
  };

  static unstyled = (props: ButtonProps) => {
    return <UnstyledButton {...props} />;
  };

  render() {
    return <ButtonWithIcon {...this.props} />;
  }
}
