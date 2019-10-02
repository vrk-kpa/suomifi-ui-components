import React, { Component, Fragment } from 'react';
import { default as styled } from 'styled-components';
import { withSuomifiDefaults } from '../theme/utils';
import { TokensComponent } from '../theme';
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

export interface DropdownProps extends CompDropdownProps, TokensComponent {}

const StyledDropdown = styled(({ tokens, ...passProps }: DropdownProps) => (
  <CompDropdown
    {...passProps}
    dropdownItemProps={{ className: 'fi-dropdown-item' }}
  />
))`
  ${props => baseStyles(props)}
`;

interface MenuListProps extends CompMenuListProps, TokensComponent {}

const StyledMenuList = styled(({ tokens, ...passProps }: MenuListProps) => (
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
    const props = withSuomifiDefaults(this.props);
    return (
      <Fragment>
        <StyledDropdown {...props} menuListComponent={StyledMenuList} />
      </Fragment>
    );
  }
}
