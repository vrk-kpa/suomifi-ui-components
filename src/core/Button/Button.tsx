import React, { Component, forwardRef, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { baseStyles } from './Button.baseStyles';
import { HtmlButton, HtmlButtonProps } from '../../reset';
import { Icon, IconProps, BaseIconKeys } from '../Icon/Icon';
import { SuomifiThemeConsumer, SuomifiThemeProp } from '../theme';

type ButtonVariant =
  | 'default'
  | 'inverted'
  | 'secondary'
  | 'secondaryNoBorder'
  | 'link';

interface InternalButtonProps
  extends Omit<HtmlButtonProps, 'aria-disabled' | 'onClick'> {
  /**
   * 'default' | 'inverted' | 'secondary' | 'secondaryNoBorder' | 'link'
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
  onClick?: (event: React.MouseEvent) => void;
}

interface InnerRef {
  forwardedRef: React.RefObject<HTMLButtonElement>;
}

export interface ButtonProps extends InternalButtonProps {
  /** Ref object to be passed to the input element */
  ref?: React.RefObject<HTMLButtonElement>;
}

const baseClassName = 'fi-button';
const disabledClassName = `${baseClassName}--disabled`;
const iconClassName = `${baseClassName}_icon`;
const iconRightClassName = `${baseClassName}_icon--right`;
const fullWidthClassName = `${baseClassName}--fullwidth`;

class BaseButton extends Component<ButtonProps & InnerRef> {
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
      forwardedRef,
      children,
      ...passProps
    } = this.props;
    const { className: iconPropsClassName, ...passIconProps } = iconProps;
    const onClickProp = !!disabled || !!ariaDisabled ? {} : { onClick };

    return (
      <HtmlButton
        {...passProps}
        {...onClickProp}
        {...(!!disabled ? {} : { tabIndex: 0 })}
        aria-disabled={!!ariaDisabled || !!disabled}
        forwardedRef={forwardedRef}
        disabled={!!disabled}
        className={classnames(baseClassName, className, {
          [disabledClassName]: !!disabled || !!ariaDisabled,
          [`${baseClassName}--inverted`]: variant === 'inverted',
          [`${baseClassName}--secondary`]: variant === 'secondary',
          [`${baseClassName}--secondary-noborder`]:
            variant === 'secondaryNoBorder',
          [`${baseClassName}--link`]: variant === 'link',
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
    );
  }
}

const StyledButton = styled(
  ({
    theme,
    ...passProps
  }: InternalButtonProps & InnerRef & SuomifiThemeProp) => (
    <BaseButton {...passProps} />
  ),
)`
  ${({ theme }) => baseStyles(theme)}
`;

/**
 * <i class="semantics" />
 * Use for inside Application onClick events.<br />
 */
export const Button = forwardRef(
  (props: ButtonProps, ref: React.RefObject<HTMLButtonElement>) => (
    <SuomifiThemeConsumer>
      {({ suomifiTheme }) => (
        <StyledButton theme={suomifiTheme} forwardedRef={ref} {...props} />
      )}
    </SuomifiThemeConsumer>
  ),
);
