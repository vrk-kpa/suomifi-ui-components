import React, { Component, Fragment } from 'react';
import { default as styled } from 'styled-components';
import { withSuomifiDefaultProps } from '../theme/utils';
import { TokensProp, InternalTokensProp } from '../theme';
import { baseStyles, menuPopoverStyles } from './Dropdown.baseStyles';
import {
  MenuPopover as CompMenuPopover,
  MenuPopoverProps as CompMenuPopoverProps,
  MenuItems as CompMenuItems,
} from '../../components/LanguageMenu/LanguageMenu';
import {
  Dropdown as CompDropdown,
  DropdownProps as CompDropdownProps,
} from '../../components/Dropdown/Dropdown';
import { DropdownItem, DropdownItemProps } from './DropdownItem';
import { positionMatchWidth } from '@reach/popover';

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

interface MenuPopoverProps extends CompMenuPopoverProps, TokensProp {}

const StyledMenuPopover = styled(
  ({ tokens, children, ...passProps }: MenuPopoverProps) => (
    <CompMenuPopover position={positionMatchWidth} {...passProps}>
      <CompMenuItems>{children}</CompMenuItems>
    </CompMenuPopover>
  ),
)`
  ${props => menuPopoverStyles(props.theme)}
`;

/**
 * <i class="semantics" />
 * Use for selectable dropdown with items.
 */
export class Dropdown extends Component<DropdownProps> {
  static item = (props: DropdownItemProps) => <DropdownItem {...props} />;

  render() {
    const props = withSuomifiDefaultProps(this.props);
    return (
      <Fragment>
        <StyledDropdown {...props} menuPopoverComponent={StyledMenuPopover} />
      </Fragment>
    );
  }
}
