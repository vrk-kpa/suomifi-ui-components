import React, { Component } from 'react';
import {
  MenuItem as CompMenuItem,
  MenuLink as CompMenuLink,
  MenuItemProps,
  MenuLinkProps,
} from '../../components/Menu/Menu';
import { MenuItemLanguage, MenuItemLanguageProps } from './MenuItemLanguage';
import { MenuLinkLanguage, MenuLinkLanguageProps } from './MenuLinkLanguage';
export {
  MenuItemProps,
  MenuLinkProps,
  MenuItemLanguage,
  MenuItemLanguageProps,
  MenuLinkLanguage,
  MenuLinkLanguageProps,
};

export class MenuItem extends Component<MenuItemProps> {
  static language = (props: MenuItemLanguageProps) => {
    return <MenuItemLanguage {...props} />;
  };

  render() {
    return CompMenuItem;
  }
}

export class MenuLink extends Component<MenuLinkProps> {
  static language = (props: MenuLinkLanguageProps) => {
    return <MenuLinkLanguage {...props} />;
  };

  render() {
    return CompMenuLink;
  }
}
