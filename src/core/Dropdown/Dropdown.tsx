import React, { Component, Fragment } from 'react';
import { default as styled } from 'styled-components';
import { withSuomifiDefaultProps } from '../theme/utils';
import { TokensProp, InternalTokensProp } from '../theme';
import { baseStyles, menuListStyles } from './Dropdown.baseStyles';
import {
  MenuList as CompMenuList,
  MenuListProps as CompMenuListProps,
} from '../../components/LanguageMenu/LanguageMenu';
import {
  Dropdown as CompDropdown,
  DropdownProps as CompDropdownProps,
} from '../../components/Dropdown/Dropdown';
import { DropdownItem, DropdownItemProps } from './DropdownItem';

export interface DropdownProps extends CompDropdownProps, TokensProp {}

const StyledDropdown = styled(
  ({ tokens, ...passProps }: DropdownProps & InternalTokensProp) => (
    <CompDropdown
      {...passProps}
      dropdownItemProps={{ className: 'fi-dropdown_item' }}
    />
  ),
)`
  ${props => baseStyles(props)}
`;

interface MenuListProps extends CompMenuListProps, TokensProp {}

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
    const props = withSuomifiDefaultProps(this.props);
    return (
      <Fragment>
        <StyledDropdown {...props} menuListComponent={StyledMenuList} />
      </Fragment>
    );
  }
}
