import React, { Component, ReactNode } from 'react';
import {
  Menu as ReachMenu,
  MenuButton,
  MenuList,
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

type SupportedMenuLinkComponent = object | keyof JSX.IntrinsicElements;

export interface MenuLinkProps {
  type: 'menulink';
  /** Url to direct to */
  href: string;
  /** Item content */
  children: ReactNode;
  component?: SupportedMenuLinkComponent;
  className?: string;
}

export type MenuListItemsProps = MenuItemProps | MenuLinkProps;

export interface MenuProps {
  /** Name or content of menubutton */
  name: ReactNode;
  /** Custom classname to extend or customize */
  className?: string;
  /** Custom classname to extend or customize */
  menuButtonClassName?: string;
  /** Custom classname to extend or customize */
  menuListClassName?: string;
  /** Menu items: MenuItem or MenuLink */
  children?: Array<React.ReactElement<MenuListItemsProps>>;
}

export class Menu extends Component<MenuProps> {
  render() {
    const {
      children,
      name,
      className,
      menuButtonClassName,
      menuListClassName,
      ...passProps
    } = this.props;

    if (React.Children.count(children) < 1) {
      logger.warn(`Menu '${name}' does not contain items`);
      return null;
    }

    return (
      <span className={className}>
        <ReachMenu {...passProps}>
          <MenuButton className={menuButtonClassName}>{name}</MenuButton>
          <MenuList className={menuListClassName}>{children}</MenuList>
        </ReachMenu>
      </span>
    );
  }
}
