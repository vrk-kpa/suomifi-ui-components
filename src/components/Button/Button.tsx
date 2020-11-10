import React, {
  Component,
  MouseEvent,
  KeyboardEvent,
  ReactNode,
  Fragment,
} from 'react';
import { HtmlButton, HtmlButtonProps } from '../../reset';
import { VisuallyHidden } from '../Visually-hidden/Visually-hidden';
import classnames from 'classnames';
import styled from 'styled-components';
import { disabledCursor } from '../utils/css';

const baseClassName = 'fi-button';
const disabledClassName = `${baseClassName}--disabled`;

export interface MouseNonFocusProps {
  handleClick: (
    e: React.MouseEvent<Element> | React.KeyboardEvent<Element>,
  ) => void;
}

export interface MouseNonFocusReturnProps {
  onMouseDown: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onKeyUp: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
}

/**
 * @typedef {Object} buttonClick
 * @property {function} onMouseDown given button property
 * @property {function} onKeyUp given button property
 */
/** Prevent button :focus on mouse use, allow only keyboard
 * @param {function} props.handleClick function to run on click
 * @returns {buttonClick}
 */
export const mouseNonFocus = ({
  handleClick,
}: MouseNonFocusProps): MouseNonFocusReturnProps => {
  const doClick = (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>,
  ) => {
    if (!!event) {
      event.preventDefault();
    }
    handleClick(event);
  };
  const ifKeyboard = (event: KeyboardEvent<HTMLButtonElement>) =>
    (event.key === 'Enter' || event.key === ' ') && doClick(event);

  return { onMouseDown: doClick, onKeyUp: ifKeyboard };
};
export interface ButtonProps
  extends AssertiveProps,
    Omit<HtmlButtonProps, 'aria-disabled'> {
  /** Custom classname to extend or customize */
  className?: string;
  /** Event handler to execute when clicked
   *  @default void
   */
  onClick?: (event: MouseEvent | KeyboardEvent) => void;
  /**
   * Button element content
   */
  children?: ReactNode;
  /**
   * Define a label if children content does not indicate the button purpose,
   * alternatively you can define aria-labelledby with label-element id
   */
  'aria-label'?: string;
  /**
   * Prevent :focus when used with mouse
   */
  mouseNoFocus?: boolean;
}

interface AssertiveProps {
  /** Disable Button usage */
  disabled?: boolean;
  /** Soft disable the button to allow tab-focus, but disable onClick functionality */
  'aria-disabled'?: boolean;
  /** aria-live text for why Button is disabled */
  ariaAssertiveDisabled?: string;
  /** aria-live text when Button changed from disabled to enabled */
  ariaAssertiveEnabled?: string;
}

export class Assertive extends Component<AssertiveProps> {
  render() {
    const {
      ariaAssertiveDisabled,
      ariaAssertiveEnabled,
      disabled,
    } = this.props;

    if (!ariaAssertiveDisabled && !ariaAssertiveEnabled) {
      return null;
    }
    const text = !!disabled ? ariaAssertiveDisabled : ariaAssertiveEnabled;
    return !!text ? (
      <VisuallyHidden aria-live="assertive">{text}</VisuallyHidden>
    ) : null;
  }
}

const StyledHtmlButton = styled((props: ButtonProps) => (
  <HtmlButton {...props} />
))`
  &.${disabledClassName} {
    ${disabledCursor}
  }
`;

export class Button extends Component<ButtonProps> {
  render() {
    const {
      className,
      disabled = false,
      mouseNoFocus,
      onClick,
      ariaAssertiveDisabled,
      ariaAssertiveEnabled,
      'aria-disabled': ariaDisabled,
      ...passProps
    } = this.props;
    const mouseClickHandler =
      !!mouseNoFocus && !!onClick
        ? () => {
            const doClick = mouseNonFocus({ handleClick: onClick });
            return {
              onMouseDown: doClick.onMouseDown,
              onKeyUp: doClick.onKeyUp,
            };
          }
        : () => ({ onClick });
    const onClickProps =
      !!disabled || !!ariaDisabled ? {} : mouseClickHandler();
    return (
      <Fragment>
        <StyledHtmlButton
          {...passProps}
          {...onClickProps}
          aria-disabled={disabled}
          tabIndex={0}
          disabled={!!disabled}
          className={classnames(baseClassName, className, {
            [disabledClassName]: !!disabled || !!ariaDisabled,
          })}
        />

        <Assertive
          disabled={disabled}
          ariaAssertiveDisabled={ariaAssertiveDisabled}
          ariaAssertiveEnabled={ariaAssertiveEnabled}
        />
      </Fragment>
    );
  }
}
