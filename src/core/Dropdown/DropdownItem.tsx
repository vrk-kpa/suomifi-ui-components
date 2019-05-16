import React from 'react';
import {
  DropdownItem as DropdownItemComp,
  DropdownItemProps,
} from '../../components/Dropdown/Dropdown';
export { DropdownItemProps };

export const DropdownItem = (props: DropdownItemProps) => (
  <DropdownItemComp {...props} />
);
