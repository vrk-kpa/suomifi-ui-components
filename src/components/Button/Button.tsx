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
    e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>,
  ) => {
    if (!!e) {
      e.preventDefault();
    }
    handleClick(e);
  };
  const keyboard = { enter: 13, space: 32 };
  const ifKeyboard = (e: KeyboardEvent<HTMLButtonElement>) =>
    (e.keyCode === keyboard.enter || e.keyCode === keyboard.space) &&
    doClick(e);

  return { onMouseDown: doClick, onKeyUp: ifKeyboard };
};
export interface ButtonProps extends AssertiveProps, HtmlButtonProps {
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
  /** aria-live text for why Button is disabled */
  ariaAssertiveDisabled?: string;
  /** aria-live text when Button changed from disabled to enabled */
  ariaAssertiveUnDisabled?: string;
}

export class Assertive extends Component<AssertiveProps> {
  state = { unDisabled: false };

  componentDidUpdate(prevProps: AssertiveProps) {
    const { disabled } = this.props;
    if (disabled !== prevProps.disabled) {
      this.setState({ unDisabled: !disabled });
    }
  }

  render() {
    const { ariaAssertiveDisabled, ariaAssertiveUnDisabled } = this.props;
    const { unDisabled } = this.state;
    if (!ariaAssertiveDisabled && !ariaAssertiveUnDisabled) return null;
    const text = !!unDisabled ? ariaAssertiveUnDisabled : ariaAssertiveDisabled;
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
      ariaAssertiveUnDisabled,
      ...passProps
    } = this.props;
    const ifMouseNoFocus =
      !!mouseNoFocus && !!onClick
        ? () => {
            const doClick = mouseNonFocus({ handleClick: onClick });
            return {
              onMouseDown: doClick.onMouseDown,
              onKeyUp: doClick.onKeyUp,
            };
          }
        : () => ({ onClick });
    const onClickProps = !!disabled ? {} : ifMouseNoFocus();
    return (
      <Fragment>
        <StyledHtmlButton
          {...passProps}
          {...onClickProps}
          aria-disabled={disabled}
          tabIndex={0}
          className={classnames(baseClassName, className, {
            [disabledClassName]: !!disabled,
          })}
        />
        <Assertive
          disabled={disabled}
          ariaAssertiveDisabled={ariaAssertiveDisabled}
          ariaAssertiveUnDisabled={ariaAssertiveUnDisabled}
        />
      </Fragment>
    );
  }
}
