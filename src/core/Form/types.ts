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
