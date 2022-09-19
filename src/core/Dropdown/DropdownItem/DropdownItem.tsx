import React, { ReactNode } from 'react';
import { ListboxOption } from '@reach/listbox';
import { default as styled } from 'styled-components';
import { baseStyles } from './DropdownItem.basestyles';
import { dropdownClassNames } from '../Dropdown/Dropdown';
import classnames from 'classnames';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';

export interface DropdownItemProps {
  /** Item value */
  value: string;
  /** Item content */
  children: ReactNode;
  /** Classname for item */
  className?: string;
}

const BaseDropdownItem = (props: DropdownItemProps & SuomifiThemeProp) => {
  const { className, theme, ...passProps } = props;
  return (
    <ListboxOption
      className={classnames(className, dropdownClassNames.item)}
      {...passProps}
    />
  );
};

const StyledDropdownItem = styled(BaseDropdownItem)`
  ${({ theme }) => baseStyles(theme)}
`;

const DropdownItem = (props: DropdownItemProps) => (
  <SuomifiThemeConsumer>
    {({ suomifiTheme }) => (
      <StyledDropdownItem theme={suomifiTheme} {...props} />
    )}
  </SuomifiThemeConsumer>
);

DropdownItem.displayName = 'DropdownItem';
export { DropdownItem };
