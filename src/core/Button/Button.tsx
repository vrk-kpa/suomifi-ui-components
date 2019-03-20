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
  | 'secondary-small'
  | 'secondary-noborder'
  | 'tertiary';

export interface ButtonProps extends CompButtonProps, ThemeComponent {
  /**
   * Set width to grow all available space
   */
  fullWidth?: boolean;
  /**
   * 'default' | 'negative' | 'secondary' | 'secondary-small' | 'secondary-noborder' | 'tertiary'
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
    ...props
  }: ButtonProps & { right?: boolean }) => (
    <CompButton {...props} className={classnames(className, baseClassName)} />
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

class ButtonWithIcon extends Component<ButtonProps> {
  static defaultProps = defaultPropsTheme(CompButton);

  render() {
    const { children, icon, iconRight, ...rest } = this.props;
    const { disabled, theme, variant } = rest;
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

  static secondarySmall = (props: ButtonProps) => {
    return <ButtonWithIcon {...props} variant="secondary-small" />;
  };

  static secondaryNoborder = (props: ButtonProps) => {
    return <ButtonWithIcon {...props} variant="secondary-noborder" />;
  };

  static tertiary = (props: ButtonProps) => {
    return <ButtonWithIcon {...props} variant="tertiary" />;
  };

  render() {
    return <ButtonWithIcon {...this.props} />;
  }
}
