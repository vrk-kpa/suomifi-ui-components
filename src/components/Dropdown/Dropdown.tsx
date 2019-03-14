import React, { Component, ReactNode, ReactElement } from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemProps,
} from '@reach/menu-button';
import { logger } from '../../utils/logger';
import '@reach/menu-button/styles.css';

export { MenuItem as DropdownItem };

export interface DropdownItemProps {
  /** Operation to run on select */
  onSelect: () => void;
  /** Item content */
  children: ReactNode;
}

type DropdownListItems = DropdownItemProps;

export interface DropdownProps {
  /** Name to show for the dropdown */
  name: ReactNode;
  /** Change name by selection
   * @default true
   */
  changeNameToSelection?: boolean;
  /** Custom classname to extend or customize */
  className?: string;
  /** Custom classname to extend or customize */
  dropdownButtonClassName?: string;
  /** Custom classname to extend or customize */
  dropdownListClassName?: string;
  /** Custom classname to extend or customize */
  dropdownItemClassName?: string;
  /** DropdownItems */
  children?:
    | Array<ReactElement<DropdownListItems>>
    | ReactElement<DropdownListItems>;
}

export class Dropdown extends Component<DropdownProps> {
  state = { selectedName: undefined };

  changeName = (name: ReactNode) => this.setState({ selectedName: name });

  list = (
    children: ReactNode,
    changeNameToSelection: boolean,
    dropdownItemClassname?: string,
  ) =>
    React.Children.map(children, (child: React.ReactElement<MenuItemProps>) => {
      const { children: childChildren } = child.props;
      const className = { className: dropdownItemClassname };
      const isChildString =
        !!changeNameToSelection &&
        !!childChildren &&
        typeof childChildren === 'string';
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          ...className,
          ...(!!isChildString && {
            onSelect: () => {
              child.props.onSelect();
              this.changeName.bind(this)(childChildren);
            },
          }),
        });
      }
      return child;
    });

  render() {
    const {
      children,
      name,
      className,
      dropdownButtonClassName,
      dropdownListClassName,
      dropdownItemClassName,
      changeNameToSelection = true,
      ...passProps
    } = this.props;
    const { selectedName } = this.state;

    if (React.Children.count(children) < 1) {
      logger.warn(`Dropdown '${name}' does not contain items`);
      return null;
    }

    return (
      <span className={className}>
        <Menu {...passProps}>
          <MenuButton className={dropdownButtonClassName}>
            {!!selectedName ? selectedName : name}
          </MenuButton>
          <MenuList className={dropdownListClassName}>
            {this.list(children, changeNameToSelection, dropdownItemClassName)}
          </MenuList>
        </Menu>
      </span>
    );
  }
}
