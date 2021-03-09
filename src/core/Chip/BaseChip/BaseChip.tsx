import { ReactNode } from 'react';

export const baseClassName = 'fi-chip';
export const chipClassNames = {
  disabled: `${baseClassName}--disabled`,
  icon: `${baseClassName}--icon`,
  content: `${baseClassName}--content`,
  removable: `${baseClassName}--removable`,
  button: `${baseClassName}--button`,
};

export interface BaseChipProps {
  /** Chip element content */
  children: ReactNode;
  /** Custom class name for styling and customizing  */
  className?: string;
  /** Disable chip */
  disabled?: boolean;
}
