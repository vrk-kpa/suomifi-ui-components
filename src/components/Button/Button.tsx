import React, { Component, MouseEvent, KeyboardEvent, ReactNode } from 'react';
import { HtmlButton, HtmlButtonProps } from '../../reset';

export interface MouseNonFocusProps {
  handleClick: (
    e: React.MouseEvent<Element> | React.KeyboardEvent<Element>,
  ) => void;
}

export interface MouseNonFocusReturnProps {
  onMouseDown: ((event: React.MouseEvent<HTMLButtonElement>) => void);
  onKeyUp: ((event: React.KeyboardEvent<HTMLButtonElement>) => void);
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
export interface ButtonProps extends HtmlButtonProps {
  /** Custom classname to extend or customize */
  className?: string;
  /** Disable Button usage */
  disabled?: boolean;
  /** Event handler to execute when clicked
   *  @default void
   */
  onClick?: (event: MouseEvent) => void;
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

export class Button extends Component<ButtonProps> {
  render() {
    const {
      disabled = false,
      mouseNoFocus,
      onClick,
      ...passProps
    } = this.props;
    if (!!mouseNoFocus && !!onClick) {
      const doClick = mouseNonFocus({ handleClick: onClick });
      return (
        <HtmlButton
          {...passProps}
          aria-disabled={disabled}
          tabIndex={0}
          onMouseDown={doClick.onMouseDown}
          onKeyUp={doClick.onKeyUp}
        />
      );
    }
    return <HtmlButton {...this.props} aria-disabled={disabled} tabIndex={0} />;
  }
}
