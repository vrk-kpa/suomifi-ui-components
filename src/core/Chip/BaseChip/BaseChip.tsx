import { ReactNode } from 'react';

export const baseClassName = 'fi-chip';
export const chipClassNames = {
  disabled: `${baseClassName}--disabled`,
  content: `${baseClassName}--content`,
};

export interface BaseChipProps {
  /** Chip element content */
  children: ReactNode;
  /** CSS class for custom styles */
  className?: string;
  /** Disables the Chip */
  disabled?: boolean;
}
