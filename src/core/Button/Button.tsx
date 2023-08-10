import React, { Component, forwardRef, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { baseStyles } from './Button.baseStyles';
import { HtmlButton, HtmlButtonProps, HtmlSpan } from '../../reset';
import { SuomifiThemeConsumer, SuomifiThemeProp } from '../theme';

export type ButtonVariant =
  | 'default'
  | 'inverted'
  | 'secondary'
  | 'secondaryNoBorder'
  | 'secondaryLight';

export interface ButtonProps
  extends Omit<HtmlButtonProps, 'aria-disabled' | 'onClick'> {
  /**
   * Variant for the button
   * `default` | `inverted` | `secondary` | `secondaryNoBorder` | `secondaryLight`
   * @default default
   */
  variant?: ButtonVariant;
  /**
   * Button element content
   */
  children?: ReactNode;
  /**
   * Define a label if button's text content does not indicate the button's purpose (for example, button with only an icon).
   * Alternatively you can define an aria-labelledby
   */
  'aria-label'?: string;
  /** Disables the button */
  disabled?: boolean;
  /** Soft disables the button to allow tab-focus. Disables onClick() functionality */
  'aria-disabled'?: boolean;
  /** CSS class for custom styles */
  className?: string;
  /**
   * Sets width to fill all available space
   */
  fullWidth?: boolean;
  /**
   * Icon from suomifi-icons
   */
  icon?: ReactNode;
  /**
   * Icon from suomifi-icons to be placed on the right side
   */
  iconRight?: ReactNode;
  /** Callback fired on button click */
  onClick?: (event: React.MouseEvent) => void;
  /** Ref object is passed to the button element. Alternative to React `ref` attribute. */
  forwardedRef?: React.RefObject<HTMLButtonElement>;
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
      forwardedRef,
      children,
      ...passProps
    } = this.props;
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
          [`${baseClassName}--secondary-light`]: variant === 'secondaryLight',
          [fullWidthClassName]: fullWidth,
        })}
      >
        <HtmlSpan className={iconClassName}>{!!icon && icon}</HtmlSpan>
        {children}
        <HtmlSpan className={classnames(iconClassName, iconRightClassName)}>
          {!!iconRight && iconRight}
        </HtmlSpan>
      </HtmlButton>
    );
  }
}

const StyledButton = styled(
  ({ theme, ...passProps }: ButtonProps & SuomifiThemeProp) => (
    <BaseButton {...passProps} />
  ),
)`
  ${({ theme }) => baseStyles(theme)}
`;

const Button = forwardRef(
  (props: ButtonProps, ref: React.RefObject<HTMLButtonElement>) => (
    <SuomifiThemeConsumer>
      {({ suomifiTheme }) => (
        <StyledButton theme={suomifiTheme} forwardedRef={ref} {...props} />
      )}
    </SuomifiThemeConsumer>
  ),
);

Button.displayName = 'Button';
export { Button };
