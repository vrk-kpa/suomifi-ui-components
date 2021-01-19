import React, { ReactNode } from 'react';
import { ListboxOption } from '@reach/listbox';
import { default as styled } from 'styled-components';
import { baseStyles } from './DropdownItem.basestyles';
import { TokensProp, InternalTokensProp } from '../../theme';
import { withSuomifiDefaultProps } from '../../theme/utils';
import { dropdownClassNames } from '../Dropdown';
import classnames from 'classnames';

const itemClassName = dropdownClassNames.item;

export interface DropdownItemProps extends TokensProp {
  /** Item value */
  value: string;
  /** Item content */
  children: ReactNode;
  /** Classname for item */
  className?: string;
}

const BaseDropdownItem = (props: DropdownItemProps) => {
  const { className, ...passProps } = props;
  return <ListboxOption className={classnames(itemClassName)} {...passProps} />;
};

const StyledDropdownItem = styled(
  ({ tokens, ...passProps }: DropdownItemProps & InternalTokensProp) => (
    <BaseDropdownItem {...passProps} />
  ),
)`
  ${(props) => baseStyles(props)}
`;

export const DropdownItem = (props: DropdownItemProps) => (
  <StyledDropdownItem {...withSuomifiDefaultProps(props)} />
);
