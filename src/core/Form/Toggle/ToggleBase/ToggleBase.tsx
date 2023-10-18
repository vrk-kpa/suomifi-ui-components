import { ReactNode } from 'react';

export const baseClassName = 'fi-toggle';

export interface ToggleBaseProps {
  /** Controlled toggle state - if provided, component will update only when this is explicitly changed */
  checked?: boolean;
  /** Default status of toggle when not using controlled `checked` state
   * @default false
   */
  defaultChecked?: boolean;
  /** CSS class for custom styles */
  className?: string;
  /** Disables the component */
  disabled?: boolean;
  /**
   * Children are rendered as the toggle's label
   */
  children?: ReactNode;
  /**
   * aria-label for the toggle
   */
  'aria-label'?: string;
  /**
   * Alternatively to aria-label you can define aria-labelledby with a label element's id
   */
  'aria-labelledby'?: string;
  /**
   * HTML id attribute. If no id is specified, one will be generated
   */
  id?: string;
}
