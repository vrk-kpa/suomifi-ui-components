import React, { Component, Fragment } from 'react';
import styled from '@emotion/styled';
import classnames from 'classnames';
import { withDefaultTheme } from '../theme/utils/defaultTheme';
import { ThemeComponent } from '../theme';
import { Global } from '@emotion/core';
import { baseStyles, globalStyles } from './Dropdown.baseStyles';
import {
  Dropdown as CompDropdown,
  DropdownProps as CompDropdownProps,
} from '../../components/Dropdown/Dropdown';
export {
  DropdownItem,
  DropdownItemProps,
} from '../../components/Dropdown/Dropdown';

export interface DropdownProps extends CompDropdownProps, ThemeComponent {}

const baseClassName = 'fi-dropdown';

const StyledDropdown = styled(
  ({ theme, className, ...passProps }: DropdownProps) => (
    <CompDropdown
      {...passProps}
      className={classnames(className, baseClassName)}
      dropdownButtonProps={{ className: 'fi-dropdown-button' }}
      dropdownItemProps={{ className: 'fi-dropdown-item' }}
      dropdownListProps={{ className: 'fi-dropdown-list' }}
    />
  ),
)`
  label: ${baseClassName};
  ${props => baseStyles(props)}
`;

/**
 * Use for selectable dropdown list.
 */
export class Dropdown extends Component<DropdownProps> {
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
