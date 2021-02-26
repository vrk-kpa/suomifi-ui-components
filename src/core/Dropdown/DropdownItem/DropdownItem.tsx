import React, { ReactNode } from 'react';
import { ListboxOption } from '@reach/listbox';
import { default as styled } from 'styled-components';
import { baseStyles } from './DropdownItem.basestyles';
import { dropdownClassNames } from '../Dropdown/Dropdown';
import classnames from 'classnames';

export interface DropdownItemProps {
  /** Item value */
  value: string;
  /** Item content */
  children: ReactNode;
  /** Classname for item */
  className?: string;
}

const BaseDropdownItem = (props: DropdownItemProps) => {
  const { className, ...passProps } = props;
  return (
    <ListboxOption
      className={classnames(className, dropdownClassNames.item)}
      {...passProps}
    />
  );
};

const StyledDropdownItem = styled(BaseDropdownItem)`
  ${baseStyles}
`;

export const DropdownItem = (props: DropdownItemProps) => (
  <StyledDropdownItem {...props} />
);
