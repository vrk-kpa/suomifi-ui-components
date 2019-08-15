import React, { Component, Fragment } from 'react';
import { default as styled } from 'styled-components';
import { withDefaultTheme } from '../theme/utils';
import { ThemeComponent } from '../theme';
import { baseStyles, menuListStyles } from './Dropdown.baseStyles';
import {
  MenuList as CompMenuList,
  MenuListProps as CompMenuListProps,
} from '../../components/Menu/Menu';
import {
  Dropdown as CompDropdown,
  DropdownProps as CompDropdownProps,
} from '../../components/Dropdown/Dropdown';
import { DropdownItem, DropdownItemProps } from './DropdownItem';

export interface DropdownProps extends CompDropdownProps, ThemeComponent {}

const StyledDropdown = styled(({ theme, ...passProps }: DropdownProps) => (
  <CompDropdown
    {...passProps}
    dropdownItemProps={{ className: 'fi-dropdown-item' }}
  />
))`
  ${props => baseStyles(props)}
`;

interface MenuListProps extends CompMenuListProps, ThemeComponent {}

const StyledMenuList = styled(({ theme, ...passProps }: MenuListProps) => (
  <CompMenuList {...passProps} />
))`
  ${props => menuListStyles(props.theme)}
`;

/**
 * <i class="semantics" />
 * Use for selectable dropdown list.
 */
export class Dropdown extends Component<DropdownProps> {
  static item = (props: DropdownItemProps) => <DropdownItem {...props} />;

  render() {
    const props = withDefaultTheme(this.props);
    return (
      <Fragment>
        <StyledDropdown {...props} menuListComponent={StyledMenuList} />
      </Fragment>
    );
  }
}
