import React, {
  Component,
  forwardRef,
  HTMLProps,
  ReactElement,
  ReactNode,
} from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { baseStyles } from './Details.baseStyles';
import { SuomifiThemeConsumer, SuomifiThemeProp } from '../theme';
import {
  spacingStyles,
  separateMarginProps,
  MarginProps,
} from '../theme/utils/spacing';

interface InternalDetailsProps
  extends Omit<HTMLProps<HTMLDetailsElement>, 'title'>,
    MarginProps {
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
  forwardedRef?: React.RefObject<HTMLDetailsElement>;
  title?: ReactNode;
}

export type DetailsProps = InternalDetailsProps;

const baseClassName = 'fi-details';
const disabledClassName = `${baseClassName}--disabled`;
const fullWidthClassName = `${baseClassName}--fullwidth`;

class BaseDetails extends Component<DetailsProps> {
  render() {
    const {
      fullWidth,
      className,
      disabled,
      onClick,
      icon,
      iconRight,
      forwardedRef,
      children,
      style,
      title,
      ...rest
    } = this.props;
    const [marginProps, passProps] = separateMarginProps(rest);
    const marginStyle = spacingStyles(marginProps);

    return (
      <details
        {...passProps}
        {...(!!disabled ? {} : { tabIndex: 0 })}
        ref={forwardedRef}
        className={classnames(baseClassName, className, {
          [disabledClassName]: !!disabled,
          [fullWidthClassName]: fullWidth,
        })}
        style={{ ...marginStyle, ...style }}
      >
        <summary>{title}</summary>
        {children}
      </details>
    );
  }
}

const StyledDetails = styled(
  ({ theme, ...passProps }: DetailsProps & SuomifiThemeProp) => (
    <BaseDetails {...passProps} />
  ),
)`
  ${({ theme }) => baseStyles(theme)}
`;

const Details = forwardRef(
  (props: DetailsProps, ref: React.RefObject<HTMLDetailsElement>) => (
    <SuomifiThemeConsumer>
      {({ suomifiTheme }) => (
        <StyledDetails theme={suomifiTheme} forwardedRef={ref} {...props} />
      )}
    </SuomifiThemeConsumer>
  ),
);

Details.displayName = 'Details';
export { Details };
