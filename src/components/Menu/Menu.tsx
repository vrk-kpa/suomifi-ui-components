import React, { Component, ReactNode } from 'react';
import {
  Menu as ReachMenu,
  MenuButton,
  MenuList,
  MenuListProps,
  MenuItem,
  MenuLink,
} from '@reach/menu-button';
import { logger } from '../../utils/logger';
import '@reach/menu-button/styles.css';

export { MenuItem, MenuLink };

export interface MenuItemProps {
  /** Operation to run on select */
  onSelect: () => void;
  /** Item content */
  children: ReactNode;
}

type SupportedMenuLinkComponent = keyof JSX.IntrinsicElements;

export interface MenuLinkProps {
  type: 'menulink';
  /** Url to direct to */
  href: string;
  /** Item content */
  children: ReactNode;
  className?: string;
  component?: SupportedMenuLinkComponent;
}

export type MenuListItemsProps = MenuItemProps | MenuLinkProps;
type OptionalMenuListProps = { [K in keyof MenuListProps]?: MenuListProps[K] };

export interface MenuProps {
  /** Name or content of menubutton */
  name: ReactNode;
  /** Custom classname to extend or customize */
  className?: string;
  /** Custom classname to extend or customize */
  menuContainerClassName?: string;
  /** Properties given to Menu's List-component, className etc. */
  menuListProps?: OptionalMenuListProps;
  /** Menu items: MenuItem or MenuLink */
  children?: Array<React.ReactElement<MenuListItemsProps>>;
}

export class Menu extends Component<MenuProps> {
  render() {
    const {
      children,
      name,
      menuContainerClassName,
      menuListProps,
      ...passProps
    } = this.props;

    if (React.Children.count(children) < 1) {
      logger.warn(`Menu '${name}' does not contain items`);
      return null;
    }

    return (
      <span className={menuContainerClassName}>
        <ReachMenu>
          <MenuButton {...passProps}>{name}</MenuButton>
          <MenuList {...menuListProps}>{children}</MenuList>
        </ReachMenu>
      </span>
    );
  }
}
