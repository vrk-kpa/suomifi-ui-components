import React, { ReactNode } from 'react';
import { ListboxOption } from '@reach/listbox';

export interface DropdownItemProps {
  /** Item value */
  value: string;
  /** Item content */
  children: ReactNode;
  /** Classname for item */
  className?: string;
}

export const DropdownItem = (props: DropdownItemProps) => (
  <ListboxOption {...props} />
);
