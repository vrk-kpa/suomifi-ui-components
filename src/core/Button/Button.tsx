import React, { Component } from 'react';
import styled from '@emotion/styled';
import classnames from 'classnames';
import { defaultPropsTheme } from '../utils';
import { ThemeComponent, Theme } from '../theme';
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
  ({ right, ...rest }: IconProps & { right?: boolean }) => <Icon {...rest} />,
)`
  ${props => iconBaseStyles(props)}
`;

const iconColor = ({
  theme,
  invert,
  disabled,
}: {
  theme?: Theme;
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
  static defaultProps = defaultPropsTheme(CompButton);

  render() {
    const { children, icon, iconRight, ...rest } = this.props;
    const { disabled, theme, variant } = rest;
    if (variant === 'unstyled') {
      return <UnstyledButton {...passProps} />;
    }

    const secondaryOrTertiary =
      !!variant &&
      (variant === 'secondary' ||
        variant === 'secondary-noborder' ||
        variant === 'tertiary');
    return (
      <StyledButton {...rest}>
        {!!icon && (
          <StyledIcon
            icon={icon}
            right={false}
            color={iconColor({ theme, disabled, invert: secondaryOrTertiary })}
          />
        )}
        {children}
        {!!iconRight && (
          <StyledIcon
            icon={iconRight}
            right={true}
            color={iconColor({ theme, disabled, invert: secondaryOrTertiary })}
          />
        )}
      </StyledButton>
    );
  }
}

/**
 * Use for inside Application onClick events.
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
