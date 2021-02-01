import { ReactNode } from 'react';
import { HtmlSpanProps } from '../../../../reset/HtmlSpan/HtmlSpan';

export const baseClassName = 'fi-toggle';

export interface ToggleBaseProps {
  /** Controlled toggle-state - if provided, component will update only when this is explicitly changed */
  checked?: boolean;
  /** Default status of toggle when not using controlled 'checked' state
   * @default false
   */
  defaultChecked?: boolean;
  /** Custom classname to extend or customize */
  className?: string;
  /** Disable usage */
  disabled?: boolean;
  /**
   * Label element content
   */
  children?: ReactNode;
  /**
   * aria-label for the HTML input-element,
   */
  'aria-label'?: string;
  /**
   * alternatively to aria-label you can define aria-labelledby with label-element id
   */
  'aria-labelledby'?: string;
  /** Unique id
   * @default uuidV4
   */
  id?: string;
  /**
   * Props for wrapping span element.
   */
  toggleWrapperProps?: HtmlSpanProps;
}
