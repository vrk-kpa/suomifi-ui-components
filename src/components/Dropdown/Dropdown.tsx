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
  /** DropdownItems */
  children?:
    | Array<ReactElement<DropdownListItems>>
    | ReactElement<DropdownListItems>;
}

const list = (children: ReactNode) =>
  React.Children.map(children, (child: React.ReactElement<MenuItemProps>) => {
    const { children: childChildren } = child.props;
    if (
      React.isValidElement(child) &&
      !!childChildren &&
      typeof childChildren === 'string'
    ) {
      return React.cloneElement(child, {
        onSelect: () => {
          child.props.onSelect();
          this.changeName.bind(this)(childChildren);
        },
      });
    }
    return child;
  });

export class Dropdown extends Component<DropdownProps> {
  state = { selectedName: undefined };

  changeName = (name: ReactNode) => this.setState({ selectedName: name });

  render() {
    const {
      children,
      name,
      className,
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
          <MenuButton>{!!selectedName ? selectedName : name}</MenuButton>
          <MenuList>
            {!!changeNameToSelection ? list(children) : children}
          </MenuList>
        </Menu>
      </span>
    );
  }
}
