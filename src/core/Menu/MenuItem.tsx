import React, { Component } from 'react';
import classnames from 'classnames';
import {
  MenuItem as CompMenuItem,
  MenuLink as CompMenuLink,
  MenuItemProps,
  MenuLinkProps,
} from '../../components/Menu/Menu';
export { MenuItemProps, MenuLinkProps };

export interface MenuLanguageItemProps extends MenuItemProps {
  /** Show item as selected one */
  selected?: boolean;
  className?: string;
}

export interface MenuLanguageLinkProps extends MenuLinkProps {
  /** Show item as selected one */
  selected?: boolean;
  className?: string;
}

export const MenuLanguageItem = ({
  selected,
  className,
  ...passProps
}: MenuLanguageItemProps) => (
  <CompMenuItem
    {...passProps}
    className={classnames(className, {
      'fi-menu-lang-item-selected': selected,
    })}
  />
);

export const MenuLanguageLink = ({
  selected,
  className,
  ...passProps
}: MenuLanguageLinkProps) => (
  <CompMenuLink
    {...passProps}
    className={classnames(className, {
      'fi-menu-lang-item-selected': selected,
    })}
  />
);

export class MenuItem extends Component<MenuItemProps> {
  static language = (props: MenuLanguageItemProps) => {
    return <MenuLanguageItem {...props} />;
  };

  render() {
    return CompMenuItem;
  }
}

export class MenuLink extends Component<MenuLinkProps> {
  static language = (props: MenuLanguageLinkProps) => {
    return <MenuLanguageLink {...props} />;
  };

  render() {
    return CompMenuLink;
  }
}
