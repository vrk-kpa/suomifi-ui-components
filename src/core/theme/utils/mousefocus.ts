import { MouseEvent, KeyboardEvent } from 'react';

export interface NoMouseFocusProps<T, K> {
  callback: (event: MouseEvent<T> | KeyboardEvent<K>) => void;
}

/**
 * @typedef {Object} clickAndKeyboardHandler
 * @property {function} onMouseDown handler for onMouseDown
 * @property {function} onKeyUp handler for onKeyUp
 */
export interface NoMouseFocusReturnProps<T, K> {
  onMouseDown: (event: MouseEvent<T>) => void;
  onKeyUp: (event: KeyboardEvent<K>) => void;
}

/** Prevent button :focus on mouse use and allow focus only with keyboard
 * @param {function} callback function to execute on click or on key press
 * @returns {clickAndKeyboardHandler}
 */
export const noMouseFocus = <T, K>({
  callback,
}: NoMouseFocusProps<T, K>): NoMouseFocusReturnProps<T, K> => {
  return {
    onMouseDown: (event: MouseEvent<T>) => {
      event.preventDefault();
      callback(event);
    },
    onKeyUp: (event: KeyboardEvent<K>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        callback(event);
      }
    },
  };
};
