import React, { Component, Fragment } from 'react';
import styled from '@emotion/styled';
import { withDefaultTheme } from '../theme/utils';
import { ThemeComponent } from '../theme';
import { Global } from '@emotion/core';
import { baseStyles, globalStyles } from './Dropdown.baseStyles';
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
        <Global styles={globalStyles(props)} />
        <StyledDropdown {...props} />
      </Fragment>
    );
  }
}
