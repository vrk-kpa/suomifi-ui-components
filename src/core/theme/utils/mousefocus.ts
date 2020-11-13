import { MouseEvent, KeyboardEvent } from 'react';

export interface NoMouseFocusProps {
  callback: (event: MouseEvent<Element> | KeyboardEvent<Element>) => void;
}

/**
 * @typedef {Object} clickAndKeyboardHandler
 * @property {function} onMouseDown handler for onMouseDown
 * @property {function} onKeyUp handler for onKeyUp
 */
export interface NoMouseFocusReturnProps {
  onMouseDown: (event: MouseEvent<HTMLButtonElement>) => void;
  onKeyUp: (event: KeyboardEvent<HTMLButtonElement>) => void;
}

/** Prevent button :focus on mouse use and allow focus only with keyboard
 * @param {function} callback function to execute on click or on key press
 * @returns {clickAndKeyboardHandler}
 */
export const noMouseFocus = ({
  callback,
}: NoMouseFocusProps): NoMouseFocusReturnProps => {
  return {
    onMouseDown: (event) => {
      event.preventDefault();
      callback(event);
    },
    onKeyUp: (event: any) => {
      if (event.key === 'Enter' || event.key === ' ') {
        callback(event);
      }
    },
  };
};
