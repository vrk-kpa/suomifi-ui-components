import React, { Component, ReactNode, Fragment } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { classnamesValue } from '../../utils/typescript';
import { withDefaultTheme } from '../theme/utils';
import { ThemeComponent } from '../theme';
import { Global } from '@emotion/core';
import { baseStyles, globalStyles } from './Menu.baseStyles';
import {
  Menu as CompMenu,
  MenuProps as CompMenuProps,
  MenuListItemsProps,
} from '../../components/Menu/Menu';
import {
  MenuItemLanguage,
  MenuItemLanguageProps,
  MenuLinkLanguage,
  MenuLinkLanguageProps,
} from './MenuItem';

import { Icon } from '../Icon/Icon';

const itemClassName = 'fi-menu_item';
const itemLangClassName = 'fi-menu-language_item';
const buttonClassName = 'fi-menu_button';
const buttonLangClassName = 'fi-menu-language_button';
const listClassName = 'fi-menu_list';
const listLangClassName = 'fi-menu-language_list';
const iconLangClassName = 'fi-menu-language_icon';

type ButtonVariant = 'default' | 'language';

export interface MenuProps extends CompMenuProps, ThemeComponent {
  /**
   * 'default' | 'language'
   * @default default
   */
  variant?: ButtonVariant;
}

const StyledMenu = styled(({ theme, ...passProps }: MenuProps) => (
  <CompMenu {...passProps} />
))`
  ${props => baseStyles(props)}
`;

const MenuListWithProps = (children: ReactNode, addClass?: classnamesValue) =>
  React.Children.map(
    children,
    (child: React.ReactElement<MenuListItemsProps>) => {
      // Set defaul component-prop/type to be 'a' needed for links
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          component: 'a',
          className: classnames(itemClassName, addClass),
        });
      }
      return child;
    },
  );

const languageName = (name: ReactNode) => (
  <Fragment>
    {name}
    <Icon icon="chevronDown" className={iconLangClassName} />
  </Fragment>
);

class MenuVariation extends Component<MenuProps> {
  render() {
    const {
      children,
      variant,
      name,
      className,
      ...passProps
    } = withDefaultTheme(this.props);
    const ifMenuLanguage = variant === 'language';
    const menuButtonClassName = classnames(
      buttonClassName,
      {
        [buttonLangClassName]: ifMenuLanguage,
      },
      className,
    );
    const menuListProps = {
      className: classnames(listClassName, {
        [listLangClassName]: ifMenuLanguage,
      }),
    };

    return (
      <Fragment>
        <Global styles={globalStyles(this.props)} />
        <StyledMenu
          {...passProps}
          name={!!ifMenuLanguage ? languageName(name) : name}
          menuButtonClassName={menuButtonClassName}
          menuListProps={menuListProps}
        >
          {MenuListWithProps(children, {
            [itemLangClassName]: ifMenuLanguage,
          })}
        </StyledMenu>
      </Fragment>
    );
  }
}

/**
 * <i class="semantics" />
 * Use for dropdown menu.
 */
export class Menu extends Component<MenuProps> {
  static language = (props: MenuProps) => {
    return <MenuVariation {...props} variant="language" />;
  };

  static languageItem = (props: MenuItemLanguageProps) => {
    return <MenuItemLanguage {...props} />;
  };

  static LinkLanguage = (props: MenuLinkLanguageProps) => {
    return <MenuLinkLanguage {...props} />;
  };

  render() {
    return <MenuVariation {...this.props} />;
  }
}
