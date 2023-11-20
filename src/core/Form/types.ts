export type InputStatus = 'default' | 'error' | 'success';

export type AriaLiveMode = 'assertive' | 'polite' | 'off';

export interface StatusTextCommonProps {
  /** Status text to be shown below the component and hint text. Use e.g. for validation error messages */
  statusText?: string;
  /**
   * `'assertive'` | `'polite'` | `'off'`
   *
   * Aria-live mode for the status text element
   * @default assertive
   */
  statusTextAriaLiveMode?: AriaLiveMode;
}

export type characterCounterProps =
  | {
      characterLimit?: never;
      ariaCharactersRemainingText?: never;
      ariaCharactersExceededText?: never;
    }
  | {
      /** Maximun amount of characters allowed in the textarea.
       * Using this prop adds a visible character counter to the bottom right corner of the textarea.
       */
      characterLimit?: number;
      /** Returns a text which screen readers read to indicate how many characters can still be written to the textarea.
       * Required with `characterLimit`
       */
      ariaCharactersRemainingText: (amount: number) => string;
      /** Returns a text which screen readers read to indicate how many characters are over the maximum allowed chracter amount.
       * Required with `characterLimit`
       */
      ariaCharactersExceededText: (amount: number) => string;
    };
