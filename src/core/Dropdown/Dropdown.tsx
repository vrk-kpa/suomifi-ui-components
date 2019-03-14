import React, { Component, Fragment } from 'react';
import styled from '@emotion/styled';
import classnames from 'classnames';
import { defaultPropsTheme } from '../utils';
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
  ({ theme, className, ...props }: DropdownProps) => (
    <CompDropdown
      {...props}
      className={classnames(className, baseClassName)}
      dropdownButtonClassName="fi-dropdown-button"
      dropdownItemClassName="fi-dropdown-item"
      dropdownListClassName="fi-dropdown-list"
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
  static defaultProps = defaultPropsTheme(CompDropdown);

  render() {
    return (
      <Fragment>
        <Global styles={globalStyles(this.props)} />
        <StyledDropdown {...this.props} />
      </Fragment>
    );
  }
}
