import React, { Component } from 'react';
import styled from '@emotion/styled';
import classnames from 'classnames';
import { defaultPropsTheme } from '../utils';
import { IThemeComponent, ITheme } from '../theme';
import { baseStyles, iconBaseStyles } from './Button.baseStyles';
import {
  default as CompButton,
  IButtonProps as ICompButtonProps,
} from '../../components/Button/Button';
import { IconKeys } from '../theme/icons';
import Icon, { IIconProps } from '../Icon/Icon';

type ButtonVariant =
  | 'default'
  | 'negative'
  | 'secondary'
  | 'secondary-small'
  | 'secondary-noborder'
  | 'tertiary';

export interface IButtonProps extends ICompButtonProps, IThemeComponent {
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
  }: IButtonProps & { right?: boolean }) => (
    <CompButton {...props} className={classnames(className, baseClassName)} />
  ),
)`
  label: ${({ disabled }) =>
    disabled ? `${baseClassName}--disabled` : baseClassName};
  ${props => baseStyles(props)}
`;

const StyledIcon = styled(
  ({ right, ...passProps }: IIconProps & { right?: boolean }) => (
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
  theme?: ITheme;
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

class ButtonWithIcon extends Component<IButtonProps> {
  static defaultProps = defaultPropsTheme(CompButton);

  render() {
    const { children, icon, iconRight, ...passProps } = this.props;
    const { disabled, theme, variant } = passProps;
    const secondaryOrTertiary =
      !!variant && (variant === 'secondary' || variant === 'tertiary');
    return (
      <StyledButton {...passProps}>
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
export default class Button extends Component<IButtonProps> {
  static negative = (props: IButtonProps) => {
    return <ButtonWithIcon {...props} variant="negative" />;
  };

  static secondary = (props: IButtonProps) => {
    return <ButtonWithIcon {...props} variant="secondary" />;
  };

  static secondarySmall = (props: IButtonProps) => {
    return <ButtonWithIcon {...props} variant="secondary-small" />;
  };

  static secondaryNoborder = (props: IButtonProps) => {
    return <ButtonWithIcon {...props} variant="secondary-noborder" />;
  };

  static tertiary = (props: IButtonProps) => {
    return <ButtonWithIcon {...props} variant="tertiary" />;
  };

  render() {
    return <ButtonWithIcon {...this.props} />;
  }
}
