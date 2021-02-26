import React, { Component, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { baseStyles } from './Button.baseStyles';
import { HtmlButton, HtmlButtonProps } from '../../reset';
import { Icon, IconProps, BaseIconKeys } from '../Icon/Icon';

type ButtonVariant =
  | 'default'
  | 'inverted'
  | 'secondary'
  | 'secondary-noborder'
  | 'tertiary';

export interface ButtonProps
  extends Omit<HtmlButtonProps, 'aria-disabled' | 'onClick'> {
  /**
   * 'default' | 'inverted' | 'secondary' | 'secondary-noborder' | 'tertiary'
   * @default default
   */
  variant?: ButtonVariant;
  /**
   * Button element content
   */
  children?: ReactNode;
  /**
   * Define a label if children content does not indicate the button purpose,
   * alternatively you can define aria-labelledby with label-element id
   */
  'aria-label'?: string;
  /** Disable Button usage */
  disabled?: boolean;
  /** Soft disable the button to allow tab-focus, but disable onClick functionality */
  'aria-disabled'?: boolean;
  /** Custom classname to extend or customize */
  className?: string;
  /**
   * Set width to grow all available space
   */
  fullWidth?: boolean;
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
  /** Event handler to execute when clicked
   *  @default void
   */
  onClick?: (event: MouseEvent | KeyboardEvent) => void;
}

const baseClassName = 'fi-button';
const disabledClassName = `${baseClassName}--disabled`;
const iconClassName = `${baseClassName}_icon`;
const iconRightClassName = `${baseClassName}_icon--right`;
const fullWidthClassName = `${baseClassName}--fullwidth`;

class BaseButton extends Component<ButtonProps> {
  render() {
    const {
      fullWidth,
      variant = 'default',
      className,
      disabled = false,
      onClick,
      'aria-disabled': ariaDisabled = false,
      icon,
      iconRight,
      iconProps = { className: undefined },
      children,
      ...passProps
    } = this.props;
    const { className: iconPropsClassName, ...passIconProps } = iconProps;
    const onClickProp = !!disabled || !!ariaDisabled ? {} : { onClick };

    return (
      <>
        <HtmlButton
          {...passProps}
          {...onClickProp}
          aria-disabled={!!ariaDisabled || !!disabled}
          tabIndex={0}
          disabled={!!disabled}
          className={classnames(baseClassName, className, {
            [disabledClassName]: !!disabled || !!ariaDisabled,
            [`${baseClassName}--${variant}`]: variant !== 'default',
            [fullWidthClassName]: fullWidth,
          })}
        >
          {!!icon && (
            <Icon
              {...passIconProps}
              mousePointer={true}
              icon={icon}
              color="currentColor"
              className={classnames(iconClassName, iconPropsClassName)}
            />
          )}
          {children}
          {!!iconRight && (
            <Icon
              {...passIconProps}
              mousePointer={true}
              icon={iconRight}
              color="currentColor"
              className={classnames(
                iconClassName,
                iconRightClassName,
                iconPropsClassName,
              )}
            />
          )}
        </HtmlButton>
      </>
    );
  }
}

const StyledButton = styled(BaseButton)`
  ${baseStyles}
`;

/**
 * <i class="semantics" />
 * Use for inside Application onClick events.<br />
 * When using Button.secondaryNoborder with other than white background,<br />
 * define styles background color for all needed states (:hover, :active, :disabled)<br /><br />
 */
export class Button extends Component<ButtonProps> {
  static inverted = (props: ButtonProps) => (
    <StyledButton {...props} variant="inverted" />
  );

  static secondary = (props: ButtonProps) => (
    <StyledButton {...props} variant="secondary" />
  );

  static secondaryNoborder = (props: ButtonProps) => (
    <StyledButton {...props} variant="secondary-noborder" />
  );

  static tertiary = (props: ButtonProps) => (
    <StyledButton {...props} variant="tertiary" />
  );

  render() {
    return <StyledButton {...this.props} />;
  }
}
