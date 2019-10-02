import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { TokensComponent, TokensProp } from '../theme';
import { withSuomifiDefaults } from '../theme/utils';
import { baseStyles } from './Button.baseStyles';
import {
  Button as CompButton,
  ButtonProps as CompButtonProps,
} from '../../components/Button/Button';
import { Icon, IconProps, IconKeys } from '../Icon/Icon';
import { UnstyledButton } from './UnstyledButton';

type ButtonVariant =
  | 'default'
  | 'negative'
  | 'secondary'
  | 'secondary-noborder'
  | 'tertiary'
  | 'unstyled';

export interface ButtonProps extends CompButtonProps, TokensComponent {
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
const iconClassName = `${baseClassName}_icon`;
const iconRightClassName = `${baseClassName}_icon--right`;

const StyledButton = styled(
  ({
    tokens,
    fullWidth,
    variant = 'default',
    className,
    ...passProps
  }: ButtonProps & { right?: boolean }) => (
    <CompButton
      {...passProps}
      className={classnames(className, {
        [`${baseClassName}--${variant}`]: variant !== 'default',
      })}
    />
  ),
)`
  ${props => baseStyles(props)}
`;

const iconColor = ({
  tokens,
  invert,
  disabled,
}: {
  tokens: TokensProp;
  invert?: boolean;
  disabled?: boolean;
}) => {
  const defaultColor = !!disabled
    ? tokens.colors.depthBase
    : tokens.colors.whiteBase;
  const secondaryColor = !!disabled
    ? tokens.colors.depthBase
    : tokens.colors.highlightBase;
  return !!invert ? secondaryColor : defaultColor;
};

class ButtonWithIcon extends Component<ButtonProps & { tokens: TokensProp }> {
  render() {
    const { icon, iconRight, iconProps = {}, ...passProps } = this.props;
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
            color={iconColor({ tokens, disabled, invert: secondaryOrTertiary })}
            className={classnames(iconClassName, iconPropsClassName)}
            {...passIconProps}
          />
        )}
        {passProps.children}
        {!!iconRight && (
          <Icon
            mousePointer={true}
            icon={iconRight}
            color={iconColor({ tokens, disabled, invert: secondaryOrTertiary })}
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
  static negative = (props: ButtonProps) => {
    return (
      <ButtonWithIcon {...withSuomifiDefaults(props)} variant="negative" />
    );
  };

  static secondary = (props: ButtonProps) => {
    return (
      <ButtonWithIcon {...withSuomifiDefaults(props)} variant="secondary" />
    );
  };

  static secondaryNoborder = (props: ButtonProps) => {
    return (
      <ButtonWithIcon
        {...withSuomifiDefaults(props)}
        variant="secondary-noborder"
      />
    );
  };

  static tertiary = (props: ButtonProps) => {
    return (
      <ButtonWithIcon {...withSuomifiDefaults(props)} variant="tertiary" />
    );
  };

  static unstyled = (props: ButtonProps) => {
    return <UnstyledButton {...withSuomifiDefaults(props)} />;
  };

  render() {
    return <ButtonWithIcon {...withSuomifiDefaults(this.props)} />;
  }
}
