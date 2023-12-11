import React, { Component, forwardRef, ReactElement, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { baseStyles } from './Button.baseStyles';
import { HtmlButton, HtmlButtonProps, HtmlSpan } from '../../reset';
import { SuomifiThemeConsumer, SuomifiThemeProp } from '../theme';
import {
  spacingStyles,
  separateMarginProps,
  MarginProps,
} from '../theme/utils/spacing';

export type ButtonVariant =
  | 'default'
  | 'inverted'
  | 'secondary'
  | 'secondaryNoBorder'
  | 'secondaryLight';

type ForcedAccessibleNameProps =
  | {
      children: ReactNode;
      'aria-label'?: string;
    }
  | {
      /**
       * Button element content
       */
      children?: never;
      /**
       * Define a label if button's text content does not indicate the button's purpose (for example, button with only an icon).
       * If the button has a visible label, make sure the aria-label includes the visible text.
       * Alternatively you can define an `aria-labelledby`.
       */
      'aria-label': string;
    };

interface InternalButtonProps
  extends Omit<HtmlButtonProps, 'aria-disabled' | 'onClick'>,
    MarginProps {
  /**
   * Variant for the button
   * `default` | `inverted` | `secondary` | `secondaryNoBorder` | `secondaryLight`
   * @default default
   */
  variant?: ButtonVariant;
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
  icon?: ReactElement;
  /**
   * Icon from suomifi-icons to be placed on the right side
   */
  iconRight?: ReactElement;
  /** Callback fired on button click */
  onClick?: (event: React.MouseEvent) => void;
  /** Ref object is passed to the button element. Alternative to React `ref` attribute. */
  forwardedRef?: React.RefObject<HTMLButtonElement>;
}

export type ButtonProps = InternalButtonProps & ForcedAccessibleNameProps;

const baseClassName = 'fi-button';
const disabledClassName = `${baseClassName}--disabled`;
const iconClassName = `${baseClassName}_icon`;
const iconStandaloneClassName = `${baseClassName}--icon-only`;
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
      style,
      ...rest
    } = this.props;
    const [marginProps, passProps] = separateMarginProps(rest);
    const marginStyle = spacingStyles(marginProps);
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
          [iconStandaloneClassName]: (!!icon || !!iconRight) && !children,
        })}
        style={{ ...marginStyle, ...style }}
      >
        {!!icon && <HtmlSpan className={iconClassName}>{icon}</HtmlSpan>}
        {children}
        {!!iconRight && (
          <HtmlSpan className={classnames(iconClassName, iconRightClassName)}>
            {iconRight}
          </HtmlSpan>
        )}
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
