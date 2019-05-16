import React, { Component, ReactNode, Fragment } from 'react';
import styled from '@emotion/styled';
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

const iconClassName = 'fi-menu-language-icon';

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
          className: classnames('fi-menu-item', addClass),
        });
      }
      return child;
    },
  );

const languageName = (name: ReactNode) => (
  <Fragment>
    {name}
    <Icon icon="chevronDown" className={iconClassName} />
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
      'fi-menu-button',
      {
        'fi-menu-language-button': ifMenuLanguage,
      },
      className,
    );
    const menuListProps = {
      className: classnames('fi-menu-list', {
        'fi-menu-language-list': ifMenuLanguage,
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
            'fi-menu-language-item': ifMenuLanguage,
          })}
        </StyledMenu>
      </Fragment>
    );
  }
}

/**
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
